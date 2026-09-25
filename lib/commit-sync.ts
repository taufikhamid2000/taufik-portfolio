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
interface Item {
  slot: string;
  title: string;
  ref: string;
  at: string;
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
    name: buffer ? `Buffer ${it + 1}${tag} — Activity` : `Sprint ${n}${tag} — Activity`,
  };
}

export async function syncCommits(): Promise<{ added: number; error?: string }> {
  if (!process.env.GITHUB_TOKEN) return { added: 0, error: 'GITHUB_TOKEN is not set.' };
  const supabase = await createClient();

  try {
    // Only look back to the newest imported commit (minus a margin; refs dedupe).
    const { data: last } = await supabase
      .from('tasks')
      .select('completed_at')
      .like('description', 'github:%')
      .order('completed_at', { ascending: false })
      .limit(1);
    const since = last?.[0]?.completed_at
      ? `&since=${new Date(new Date(last[0].completed_at).getTime() - 2 * DAY).toISOString()}`
      : '';

    const repos = (await paged<GhRepo>('/user/repos?affiliation=owner')).filter((r) => !r.fork);
    const perRepo = await Promise.all(
      repos.map(async (r) => {
        const commits = await paged<GhCommit>(`/repos/${OWNER}/${r.name}/commits?author=${OWNER}${since}`);
        return commits.filter((c) => !c.commit.message.startsWith('Merge ')).map((c) => ({ repo: r.name, c }));
      }),
    );

    const slots = new Map<string, ReturnType<typeof slotFor>>();
    const items: Item[] = perRepo.flat().map(({ repo, c }) => {
      const at = c.commit.author.date;
      const slot = slotFor(at);
      slots.set(slot.start, slot);
      return {
        slot: slot.start,
        title: `[${repo}] ${c.commit.message.split('\n')[0]}`.slice(0, 300),
        ref: `github:${repo}@${c.sha.slice(0, 7)}`,
        at,
      };
    });
    if (items.length === 0) return { added: 0 };

    const refs = items.map((i) => i.ref);
    const known = new Set<string>();
    for (let i = 0; i < refs.length; i += 200) {
      const { data } = await supabase.from('tasks').select('description').in('description', refs.slice(i, i + 200));
      data?.forEach((t: { description: string }) => known.add(t.description as string));
    }
    const fresh = items.filter((i) => !known.has(i.ref));
    if (fresh.length === 0) return { added: 0 };

    const starts = [...new Set(fresh.map((i) => i.slot))];
    const { data: existing } = await supabase.from('sprints').select('id, start_date').in('start_date', starts);
    const ids = new Map<string, string>((existing ?? []).map((s: { id: string; start_date: string }) => [s.start_date as string, s.id as string]));
    const missing = starts.filter((s) => !ids.has(s)).map((s) => slots.get(s)!);
    if (missing.length > 0) {
      const today = iso(Date.now());
      const { data, error } = await supabase
        .from('sprints')
        .insert(
          missing.map((s) => ({
            name: s.name,
            goal: 'Commits made during this window.',
            start_date: s.start,
            end_date: s.end,
            status: s.end < today ? 'completed' : 'planned',
          })),
        )
        .select('id, start_date');
      if (error) return { added: 0, error: error.message };
      data?.forEach((s: { id: string; start_date: string }) => ids.set(s.start_date as string, s.id as string));
    }

    const { error } = await supabase.from('tasks').insert(
      fresh.map((i) => ({
        sprint_id: ids.get(i.slot),
        title: i.title,
        description: i.ref,
        status: 'done',
        priority: 'medium',
        completed_at: i.at,
        display_order: 1000,
      })),
    );
    if (error) return { added: 0, error: error.message };
    return { added: fresh.length };
  } catch (e) {
    return { added: 0, error: e instanceof Error ? e.message : 'Sync failed.' };
  }
}
