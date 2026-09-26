import { createClient } from './supabase/server';

export interface CommitRow {
  repo: string;
  sha: string;
  message: string;
  committed_at: string;
  task_id: string | null;
}

export async function getCommits(): Promise<CommitRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('commits')
    .select('repo, sha, message, committed_at, task_id')
    .order('committed_at', { ascending: false })
    .limit(5000);
  if (error) {
    console.error('Failed to fetch commits:', error);
    return [];
  }
  return (data ?? []) as CommitRow[];
}
