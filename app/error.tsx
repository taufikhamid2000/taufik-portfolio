'use client';

import Link from 'next/link';

/** Last-resort boundary so a crash in the home menu never leaves visitors on a dead page. */
export default function RootError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-foreground/70">The page failed to load. You can try again, or use the classic site.</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
        <Link href="/classic" className="rounded-full border border-border px-4 py-2 hover:bg-muted">
          Classic site
        </Link>
      </div>
    </main>
  );
}
