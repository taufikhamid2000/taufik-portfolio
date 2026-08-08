import { createClient } from './supabase/server';
import { createPublicClient } from './supabase/public';
import type { Locale } from './i18n';

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

export interface InitiativeWithMinistry extends Initiative {
  ministry: { name: string; slug: string };
}

// Pick the localized value, falling back to English when the translation is null.
function pick(en: string | null, ms: string | null | undefined, locale: Locale): string {
  if (locale === 'ms' && ms) return ms;
  return en ?? '';
}

/** All ministries, with a count of their curated initiatives. Localized to `locale`. */
export async function getMinistries(locale: Locale = 'en'): Promise<MinistryWithCounts[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('ministries')
    .select('*, initiatives(count)')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch ministries:', error);
    return [];
  }

  return (data ?? []).map(
    (m: Ministry & { name_ms: string | null; description_ms: string | null; initiatives: { count: number }[] }) => {
      const { initiatives, name_ms, description_ms, ...rest } = m;
      return {
        ...rest,
        name: pick(m.name, name_ms, locale),
        description: pick(m.description, description_ms, locale) || null,
        initiative_count: initiatives?.[0]?.count ?? 0,
      };
    }
  );
}

/** A single ministry by slug, plus its initiatives (with linked project) and approved public submissions. Localized to `locale`. */
export async function getMinistryBySlug(
  slug: string,
  locale: Locale = 'en'
): Promise<{
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

  const localizedMinistry: Ministry = {
    ...ministry,
    name: pick(ministry.name, ministry.name_ms, locale),
    description: pick(ministry.description, ministry.description_ms, locale) || null,
  };

  const localizedInitiatives = ((initiatives as (Initiative & { problem_ms: string | null; idea_ms: string | null })[]) ?? []).map(
    (i) => ({
      ...i,
      problem: pick(i.problem, i.problem_ms, locale),
      idea: pick(i.idea, i.idea_ms, locale),
    })
  );

  return {
    ministry: localizedMinistry,
    initiatives: localizedInitiatives,
    submissions: (submissions as Submission[]) ?? [],
  };
}

/** Every initiative across every ministry, joined with its ministry name/slug and linked project. Localized to `locale`. */
export async function getAllInitiatives(locale: Locale = 'en'): Promise<InitiativeWithMinistry[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('initiatives')
    .select('*, project:projects(id, name, github_url, demo_url), ministry:ministries(name, name_ms, slug)')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch initiatives:', error);
    return [];
  }

  return (
    (data ?? []) as (Initiative & {
      problem_ms: string | null;
      idea_ms: string | null;
      ministry: { name: string; name_ms: string | null; slug: string };
    })[]
  ).map((i) => {
    const { problem_ms, idea_ms, ministry, ...rest } = i;
    return {
      ...rest,
      problem: pick(i.problem, problem_ms, locale),
      idea: pick(i.idea, idea_ms, locale),
      ministry: { name: pick(ministry.name, ministry.name_ms, locale), slug: ministry.slug },
    };
  });
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
