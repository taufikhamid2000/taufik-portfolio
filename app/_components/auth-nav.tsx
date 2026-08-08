import Link from 'next/link';
import { createClient } from '../../lib/supabase/server';

export async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Link href="/admin" className="text-primary hover:underline">
        Admin
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="text-foreground/50 hover:text-foreground transition-colors"
    >
      Sign in
    </Link>
  );
}
