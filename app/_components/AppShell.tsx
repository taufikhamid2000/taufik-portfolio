'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from '../login/actions';
import { SubmitButton } from './submit-button';
import { ThemeToggle } from './theme-toggle';
import type { Theme } from '../../lib/theme';

const NAV_LINKS = [
  { href: '/admin', label: 'Projects' },
  { href: '/admin/sprints', label: 'Sprints' },
  { href: '/admin/submissions', label: 'Submissions' },
  { href: '/admin/translations', label: 'Translations' },
];

// Sticky top bar (brand far left, sign-out + theme toggle far right) sits
// above everything else; the nav links live in a sidebar below it — a
// static column from md up, a slide-in drawer (opened from the header's
// hamburger) below that. Ported structurally from DuitDuit/template's
// AppShell for the /admin section, the closest thing this portfolio has
// to an authenticated dashboard.
export function AppShell({
  children,
  userEmail,
  initialTheme,
}: {
  children: React.ReactNode;
  userEmail: string;
  initialTheme: Theme;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    const mql = window.matchMedia('(min-width: 768px)');
    function onMqlChange() {
      if (mql.matches) setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    mql.addEventListener('change', onMqlChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      mql.removeEventListener('change', onMqlChange);
    };
  }, [open]);

  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-background text-foreground">
      {/* Ambient glow orbs — dark mode only, matches the rest of the site. */}
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

      <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <Link
            href="/"
            className="text-sm font-semibold dark:bg-gradient-to-r dark:from-indigo-300 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent"
          >
            Taufik&apos;s Portfolio
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-foreground/50 sm:inline">{userEmail}</span>
          <form action={signOut}>
            <SubmitButton pendingText="Signing out…" className="cursor-pointer text-foreground/60 hover:text-foreground">
              Sign out
            </SubmitButton>
          </form>
          <ThemeToggle initialTheme={initialTheme} />
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Mobile drawer */}
        <div
          aria-hidden={!open}
          className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-200 md:hidden ${
            open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Taufik's Portfolio"
          className={`fixed top-14 bottom-0 left-0 z-30 flex w-64 flex-col overflow-y-auto border-r border-border bg-background px-4 py-4 shadow-xl transition-transform duration-200 md:hidden ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="flex flex-1 flex-col gap-1">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </nav>
        </aside>

        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto border-r border-border bg-background px-4 py-6 md:flex">
          <nav className="flex flex-1 flex-col gap-1">
            <NavLinks pathname={pathname} />
          </nav>
        </aside>

        <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={
              isActive
                ? 'flex min-h-11 items-center rounded-lg bg-muted px-3 text-sm font-medium text-foreground'
                : 'flex min-h-11 items-center rounded-lg px-3 text-sm text-foreground/60 transition-colors hover:bg-muted hover:text-foreground'
            }
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
