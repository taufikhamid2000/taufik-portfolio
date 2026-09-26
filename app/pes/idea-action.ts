'use server';

import { createClient } from '../../lib/supabase/server';

/**
 * Public idea submission from the PES vision screen. Same rules as the classic form:
 * anon may only insert 'pending' rows (RLS), nothing shows until the owner approves.
 */
export async function submitIdeaAction(input: {
  ministrySlug: string;
  problem: string;
  idea: string;
  name: string;
  contact: string;
  website: string; // honeypot
}): Promise<{ error?: string }> {
  if (input.website.trim()) return {}; // bots: pretend success
  const problem = input.problem.trim();
  const idea = input.idea.trim();
  if (problem.length < 10 || idea.length < 10) return { error: 'short' };

  const supabase = await createClient();
  let ministryId: string | null = null;
  if (input.ministrySlug) {
    const { data } = await supabase.from('ministries').select('id').eq('slug', input.ministrySlug).maybeSingle();
    ministryId = data?.id ?? null;
  }
  const { error } = await supabase.from('submissions').insert({
    ministry_id: ministryId,
    problem,
    idea,
    submitter_name: input.name.trim() || null,
    submitter_contact: input.contact.trim() || null,
    status: 'pending',
  });
  return error ? { error: 'failed' } : {};
}
