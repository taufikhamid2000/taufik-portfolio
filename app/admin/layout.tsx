import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import { signOut } from '../login/actions';
import { ThemeToggle } from '../_components/theme-toggle';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware also protects this, but double-check on the server.
  if (!user) {
    redirect('/login?redirect=/admin');
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-semibold">
              Taufik&apos;s Portfolio
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Projects
              </Link>
              <Link
                href="/admin/sprints"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Sprints
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500 dark:text-gray-500 hidden sm:inline">
              {user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Sign out
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
