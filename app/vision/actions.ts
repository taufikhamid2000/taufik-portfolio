'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';

/**
 * Public, anonymous idea submission. RLS lets anon insert rows only with
 * status 'pending'; nothing is shown publicly until an admin approves it.
 */
export async function submitIdea(formData: FormData) {
  const ministrySlug = (formData.get('ministry_slug') as string) || '';
  const problem = (formData.get('problem') as string)?.trim() ?? '';
  const idea = (formData.get('idea') as string)?.trim() ?? '';
  const submitterName = (formData.get('submitter_name') as string)?.trim() || null;
  const submitterContact = (formData.get('submitter_contact') as string)?.trim() || null;
  // Honeypot — bots fill hidden fields; humans don't.
  const honeypot = (formData.get('website') as string)?.trim();

  const redirectBase = ministrySlug ? `/vision/${ministrySlug}` : '/vision';

  if (honeypot) {
    // Silently pretend success for bots.
    redirect(`${redirectBase}?submitted=1`);
  }

  if (problem.length < 10 || idea.length < 10) {
    redirect(`${redirectBase}?error=${encodeURIComponent('Please describe both the problem and your idea (at least 10 characters each).')}`);
  }

  const supabase = await createClient();

  let ministryId: string | null = null;
  if (ministrySlug) {
    const { data: ministry } = await supabase
      .from('ministries')
      .select('id')
      .eq('slug', ministrySlug)
      .maybeSingle();
    ministryId = ministry?.id ?? null;
  }

  const { error } = await supabase.from('submissions').insert({
    ministry_id: ministryId,
    problem,
    idea,
    submitter_name: submitterName,
    submitter_contact: submitterContact,
    status: 'pending',
  });

  if (error) {
    redirect(`${redirectBase}?error=${encodeURIComponent('Something went wrong submitting your idea. Please try again.')}`);
  }

  redirect(`${redirectBase}?submitted=1`);
}
