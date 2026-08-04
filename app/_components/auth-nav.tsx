import Link from 'next/link';
import { createClient } from '../../lib/supabase/server';

export async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Link href="/admin" className="text-blue-600 dark:text-blue-400 hover:underline">
        Admin
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
    >
      Sign in
    </Link>
  );
}
