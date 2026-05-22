import Link from 'next/link';
import { requestPasswordReset } from './actions';
import { ThemeToggle } from '../../_components/theme-toggle';

interface ResetPasswordPageProps {
  searchParams: Promise<{ error?: string; message?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { error, message } = await searchParams;

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            Taufik&apos;s Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-2">Reset password</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Enter your email and we&apos;ll send you a link to set a new password.
          </p>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/40 text-sm text-green-800 dark:text-green-300">
              {message}
            </div>
          )}

          <form action={requestPasswordReset} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Send reset link
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-500">
            <Link href="/login" className="hover:underline">
              &larr; Back to sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
