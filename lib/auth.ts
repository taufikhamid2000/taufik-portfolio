import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

// The one person who can write to admin-managed data — matches the email
// hardcoded into every "Admin can write ..." RLS policy in supabase/migrations.
// Kept as a single source of truth here rather than duplicated per-check so
// app-level gating and the database's own enforcement can't drift apart.
export const ADMIN_EMAIL = 'taufikhamid2000@gmail.com';

export async function getIsOwner(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email === ADMIN_EMAIL;
}

/**
 * Call at the very top of any mutating Server Action, before doing any
 * work (including calling paid third-party APIs) — RLS backs this up at
 * the database layer, but this is what stops an unauthorized caller from
 * running expensive work that would only fail at the final write.
 */
export async function requireOwner(redirectTo: string): Promise<void> {
  if (!(await getIsOwner())) {
    const separator = redirectTo.includes('?') ? '&' : '?';
    redirect(`${redirectTo}${separator}error=${encodeURIComponent('You must be signed in as the site owner to do this.')}`);
  }
}
