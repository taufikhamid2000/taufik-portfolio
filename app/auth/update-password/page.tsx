import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import { updatePassword } from './actions';
import { ThemeToggle } from '../../_components/theme-toggle';

interface UpdatePasswordPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function UpdatePasswordPage({ searchParams }: UpdatePasswordPageProps) {
  const { error } = await searchParams;

  // Make sure the recovery session is set — otherwise the user got here
  // without clicking the email link, which is invalid.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/error?reason=' + encodeURIComponent('No active session. Click the link in your email to reset your password.'));
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100 flex flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[20%] hidden h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px] dark:block"
      />

      <header className="relative z-10 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold dark:bg-gradient-to-r dark:from-indigo-300 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent"
          >
            Taufik&apos;s Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main id="main-content" className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm dark:rounded-2xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-8 dark:backdrop-blur-xl">
          <h1 className="text-2xl font-bold mb-2">Set a new password</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            For <span className="font-medium">{user.email}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-8">
            At least 8 characters.
          </p>

          {error && (
            <div
              role="alert"
              className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300"
            >
              {error}
            </div>
          )}

          <form action={updatePassword} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">
                Confirm new password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Update password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
