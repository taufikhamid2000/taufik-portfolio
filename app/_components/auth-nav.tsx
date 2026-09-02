import { createClient } from '../../lib/supabase/server';
import { signOut } from '../login/actions';
import { SubmitButton } from './submit-button';

// Only the owner ever signs in, so anonymous visitors get nothing here —
// no "Sign in" link in the public header. /login stays reachable by URL.
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

  return null;
}
