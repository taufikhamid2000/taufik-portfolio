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

/**
 * Pull new commits from GitHub into portfolio.commits. A `[T-<n>]` tag in the
 * commit message links the commit to the item with that ticket number.
 * Untagged commits stay unlinked and are grouped by repo and day in the UI.
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
    let added = 0;
    for (let i = 0; i < payload.length; i += 500) {
      const { data, error } = await supabase
        .from('commits')
        .upsert(payload.slice(i, i + 500), { onConflict: 'repo,sha', ignoreDuplicates: true })
        .select('sha');
      if (error) return { added, error: error.message };
      added += data?.length ?? 0;
    }
    return { added };
  } catch (e) {
    return { added: 0, error: e instanceof Error ? e.message : 'Sync failed.' };
  }
}
