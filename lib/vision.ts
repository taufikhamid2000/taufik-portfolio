import { createClient } from './supabase/server';
import { createPublicClient } from './supabase/public';

export type InitiativeStatus = 'active' | 'planned' | 'concept';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Ministry {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Initiative {
  id: string;
  ministry_id: string;
  project_id: string | null;
  problem: string;
  idea: string;
  status: InitiativeStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
  // joined
  project?: { id: string; name: string; github_url: string | null; demo_url: string | null } | null;
}

export interface Submission {
  id: string;
  ministry_id: string | null;
  problem: string;
  idea: string;
  submitter_name: string | null;
  submitter_contact: string | null;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

export interface MinistryWithCounts extends Ministry {
  initiative_count: number;
}

/** All ministries, with a count of their curated initiatives. */
export async function getMinistries(): Promise<MinistryWithCounts[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('ministries')
    .select('*, initiatives(count)')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch ministries:', error);
    return [];
  }

  return (data ?? []).map((m: Ministry & { initiatives: { count: number }[] }) => {
    const { initiatives, ...rest } = m;
    return { ...rest, initiative_count: initiatives?.[0]?.count ?? 0 };
  });
}

/** A single ministry by slug, plus its initiatives (with linked project) and approved public submissions. */
export async function getMinistryBySlug(slug: string): Promise<{
  ministry: Ministry;
  initiatives: Initiative[];
  submissions: Submission[];
} | null> {
  const supabase = createPublicClient();

  const { data: ministry, error: mErr } = await supabase
    .from('ministries')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (mErr || !ministry) return null;

  const [{ data: initiatives }, { data: submissions }] = await Promise.all([
    supabase
      .from('initiatives')
      .select('*, project:projects(id, name, github_url, demo_url)')
      .eq('ministry_id', ministry.id)
      .order('display_order', { ascending: true }),
    supabase
      .from('submissions')
      .select('*')
      .eq('ministry_id', ministry.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false }),
  ]);

  return {
    ministry,
    initiatives: (initiatives as Initiative[]) ?? [],
    submissions: (submissions as Submission[]) ?? [],
  };
}

/** All ministry slugs — for static params / sitemap. */
export async function getMinistrySlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from('ministries').select('slug');
  if (error) return [];
  return (data ?? []).map((m: { slug: string }) => m.slug);
}

/** Admin: all submissions (any status), newest first. */
export async function getAllSubmissions(): Promise<(Submission & { ministry: { name: string; slug: string } | null })[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('submissions')
    .select('*, ministry:ministries(name, slug)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch submissions:', error);
    return [];
  }
  return data ?? [];
}
