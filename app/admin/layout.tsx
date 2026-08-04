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
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100">
      {/* Ambient glow orbs — dark mode only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[20%] hidden h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] hidden h-96 w-96 rounded-full bg-emerald-400/10 blur-[110px] dark:block"
      />

      <header className="relative z-10 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-semibold dark:bg-gradient-to-r dark:from-indigo-300 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent"
            >
              Taufik&apos;s Portfolio
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300"
              >
                Projects
              </Link>
              <Link
                href="/admin/sprints"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300"
              >
                Sprints
              </Link>
              <Link
                href="/admin/submissions"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300"
              >
                Submissions
              </Link>
              <Link
                href="/admin/translations"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300"
              >
                Translations
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
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cyan-300"
              >
                Sign out
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
