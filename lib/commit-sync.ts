import { createClient } from './supabase/server';

const DAY = 86_400_000;
const OWNER = 'taufikhamid2000';

interface GhRepo {
  name: string;
  fork: boolean;
}
interface GhCommit {
  sha: string;
  commit: { author: { date: string }; message: string };
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path.split('?')[0]}`);
  return res.json() as Promise<T>;
}

async function paged<T>(path: string): Promise<T[]> {
  const all: T[] = [];
  for (let page = 1; page < 30; page++) {
    const rows = await gh<T[]>(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    all.push(...rows);
    if (rows.length < 100) break;
  }
  return all;
}

const iso = (t: number) => new Date(t).toISOString().slice(0, 10);

// Year calendar: 4 iterations x (4 three-week sprints + 1 buffer week), starting 1 January.
function slotFor(date: string) {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const j1 = Date.UTC(y, 0, 1);
  const week = Math.min(Math.floor((d.getTime() - j1) / DAY / 7), 51);
  const it = Math.floor(week / 13);
  const w = week % 13;
  const buffer = w === 12;
  const n = it * 4 + Math.floor(w / 3) + 1;
  const start = j1 + it * 91 * DAY + (buffer ? 84 : Math.floor(w / 3) * 21) * DAY;
  const tag = y === new Date().getUTCFullYear() ? '' : ` (${y})`;
  return {
    start: iso(start),
    end: iso(start + (buffer ? 6 : 20) * DAY),
    name: buffer ? `Buffer ${it + 1}${tag}` : `Sprint ${n}${tag}`,
  };
}

interface Stored {
  id: string;
  repo: string;
  message: string;
  committed_at: string;
  task_id: string | null;
}

/** Give every untagged commit an item: one per repo per sprint, created on demand. */
async function autoItems(supabase: Awaited<ReturnType<typeof createClient>>, fresh: Stored[]) {
  const groups = new Map<string, { repo: string; slot: ReturnType<typeof slotFor>; commits: Stored[] }>();
  for (const c of fresh) {
    if (c.task_id) continue;
    const slot = slotFor(c.committed_at);
    const key = slot.start + '|' + c.repo;
    const g = groups.get(key) ?? { repo: c.repo, slot, commits: [] };
    g.commits.push(c);
    groups.set(key, g);
  }

  const today = iso(Date.now());
  for (const g of groups.values()) {
    const ordered = [...g.commits].sort((a, b) => a.committed_at.localeCompare(b.committed_at));
    const latest = ordered[ordered.length - 1];

    let { data: sprint } = await supabase.from('sprints').select('id').eq('start_date', g.slot.start).maybeSingle();
    if (!sprint) {
      const { data } = await supabase
        .from('sprints')
        .insert({ name: g.slot.name, start_date: g.slot.start, end_date: g.slot.end, status: g.slot.end < today ? 'completed' : 'planned' })
        .select('id')
        .single();
      sprint = data;
    }
    if (!sprint) continue;

    const prefix = `${g.repo}: `;
    const { data: existing } = await supabase
      .from('tasks')
      .select('id, completed_at')
      .eq('sprint_id', sprint.id)
      .like('title', `${prefix}%`)
      .limit(1);
    let taskId: string | undefined = existing?.[0]?.id;
    if (taskId) {
      if (!existing?.[0]?.completed_at || existing[0].completed_at < latest.committed_at) {
        await supabase.from('tasks').update({ completed_at: latest.committed_at }).eq('id', taskId);
      }
    } else {
      const { data } = await supabase
        .from('tasks')
        .insert({
          sprint_id: sprint.id,
          title: `${prefix}${latest.message}`.slice(0, 200),
          description: `Auto-created from ${ordered.length} commit${ordered.length > 1 ? 's' : ''} in ${g.repo}.`,
          status: 'done',
          priority: 'medium',
          completed_at: latest.committed_at,
          display_order: 500,
        })
        .select('id')
        .single();
      taskId = data?.id;
    }
    if (taskId) await supabase.from('commits').update({ task_id: taskId }).in('id', ordered.map((c) => c.id));
  }
}

/**
 * Pull new commits from GitHub into portfolio.commits. A `[T-<n>]` tag in the
 * commit message links the commit to the item with that ticket number.
 * Untagged commits get an item automatically: one per repo per sprint window.
 */
export async function syncCommits(): Promise<{ added: number; error?: string }> {
  if (!process.env.GITHUB_TOKEN) return { added: 0, error: 'GITHUB_TOKEN is not set.' };
  const supabase = await createClient();

  try {
    // Only look back to the newest stored commit (minus a margin; unique(repo, sha) dedupes).
    const { data: last } = await supabase
      .from('commits')
      .select('committed_at')
      .order('committed_at', { ascending: false })
      .limit(1);
    const since = last?.[0]?.committed_at
      ? `&since=${new Date(new Date(last[0].committed_at).getTime() - 2 * DAY).toISOString()}`
      : '';

    const repos = (await paged<GhRepo>('/user/repos?affiliation=owner')).filter((r) => !r.fork);
    const perRepo = await Promise.all(
      repos.map(async (r) => {
        const commits = await paged<GhCommit>(`/repos/${OWNER}/${r.name}/commits?author=${OWNER}${since}`);
        return commits.filter((c) => !c.commit.message.startsWith('Merge ')).map((c) => ({ repo: r.name, c }));
      }),
    );

    const rows = perRepo.flat().map(({ repo, c }) => {
      const message = c.commit.message.split('\n')[0].slice(0, 300);
      const tag = message.match(/\[T-(\d+)\]/i);
      return {
        repo,
        sha: c.sha.slice(0, 7),
        message,
        committed_at: c.commit.author.date,
        ticket: tag ? Number(tag[1]) : null,
      };
    });
    if (rows.length === 0) return { added: 0 };

    const tickets = [...new Set(rows.map((r) => r.ticket).filter((n): n is number => n != null))];
    const taskIds = new Map<number, string>();
    if (tickets.length > 0) {
      const { data } = await supabase.from('tasks').select('id, ticket_no').in('ticket_no', tickets);
      data?.forEach((t: { id: string; ticket_no: number }) => taskIds.set(t.ticket_no, t.id));
    }

    const payload = rows.map(({ ticket, ...r }) => ({ ...r, task_id: ticket != null ? (taskIds.get(ticket) ?? null) : null }));
    const inserted: Stored[] = [];
    for (let i = 0; i < payload.length; i += 500) {
      const { data, error } = await supabase
        .from('commits')
        .upsert(payload.slice(i, i + 500), { onConflict: 'repo,sha', ignoreDuplicates: true })
        .select('id, repo, message, committed_at, task_id');
      if (error) return { added: inserted.length, error: error.message };
      inserted.push(...((data ?? []) as Stored[]));
    }
    await autoItems(supabase, inserted);
    return { added: inserted.length };
  } catch (e) {
    return { added: 0, error: e instanceof Error ? e.message : 'Sync failed.' };
  }
}
