import { createClient } from './supabase/server';

export interface CommitRow {
  repo: string;
  sha: string | null;
  message: string;
  committed_at: string;
  task_id: string | null;
}

// The owner reads the real table; everyone else reads the masked view, where commits
// from private repos have no repo name, sha or message.
export async function getCommits(isOwner: boolean): Promise<CommitRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(isOwner ? 'commits' : 'public_commits')
    .select('repo, sha, message, committed_at, task_id')
    .order('committed_at', { ascending: false })
    .limit(5000);
  if (error) {
    console.error('Failed to fetch commits:', error);
    return [];
  }
  return (data ?? []) as CommitRow[];
}
