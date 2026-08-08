import Link from 'next/link';
import { createClient } from '../../lib/supabase/server';
import { signOut } from '../login/actions';
import { SubmitButton } from './submit-button';

// Admin is always in the sidebar now (public read, owner-only writes), so
// this only needs to surface sign-in state, not gate access to it.
export async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <form action={signOut}>
        <SubmitButton pendingText="Signing out…" className="cursor-pointer text-foreground/60 hover:text-foreground">
          Sign out
        </SubmitButton>
      </form>
    );
  }

  return (
    <Link href="/login" className="text-foreground/50 hover:text-foreground transition-colors">
      Sign in
    </Link>
  );
}
