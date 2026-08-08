'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import type { Theme } from '../../lib/theme';

type NavLink = { href: string; label: string };

const ADMIN_LINKS: NavLink[] = [
  { href: '/admin', label: 'Projects' },
  { href: '/admin/sprints', label: 'Sprints' },
  { href: '/admin/submissions', label: 'Submissions' },
  { href: '/admin/translations', label: 'Translations' },
];

const VISION_LINKS_EN: NavLink[] = [
  { href: '/vision', label: 'Overview' },
  { href: '/vision/ministries', label: 'Ministries' },
  { href: '/vision/initiatives', label: 'Initiatives' },
];

const VISION_LINKS_MS: NavLink[] = [
  { href: '/ms/vision', label: 'Gambaran Keseluruhan' },
  { href: '/ms/vision/ministries', label: 'Kementerian' },
  { href: '/ms/vision/initiatives', label: 'Inisiatif' },
];

// One sidebar for the whole site — Home, Vision (Overview/Ministries/
// Initiatives), Admin (Projects/Sprints/Submissions/Translations, public
// read — see lib/auth.ts for the owner-only write gate). Replaces the
// separate AppShell (admin-only) and VisionShell (vision-only) shells so
// navigating between sections feels like one app instead of three.
export function SiteShell({
  initialTheme,
  authSlot,
  children,
}: {
  initialTheme: Theme;
  authSlot: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isVisionSection = pathname.startsWith('/vision') || pathname.startsWith('/ms/vision');
  const locale: 'en' | 'ms' = pathname.startsWith('/ms') ? 'ms' : 'en';
  const visionLinks = locale === 'ms' ? VISION_LINKS_MS : VISION_LINKS_EN;
  const otherLocaleHref = locale === 'ms' ? pathname.replace(/^\/ms/, '') || '/vision' : `/ms${pathname}`;

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
          {isVisionSection && (
            <Link
              href={otherLocaleHref}
              className="rounded-md border border-border px-2 py-1 text-foreground/60 transition-colors hover:text-foreground"
            >
              {locale === 'ms' ? 'EN' : 'BM'}
            </Link>
          )}
          {authSlot}
          <ThemeToggle initialTheme={initialTheme} />
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
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
          <SidebarNav pathname={pathname} visionLinks={visionLinks} onNavigate={() => setOpen(false)} />
        </aside>

        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto border-r border-border bg-background px-4 py-6 md:flex">
          <SidebarNav pathname={pathname} visionLinks={visionLinks} />
        </aside>

        <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 py-12">{children}</main>
      </div>

      <footer className="relative z-10 border-t border-border">
        <div className="px-6 py-8 text-center text-sm text-foreground/60">
          Built with Next.js &amp; Tailwind CSS. &copy; {new Date().getFullYear()} Muhammad Taufik Bin Hamid.
        </div>
      </footer>
    </div>
  );
}

// Several admin hrefs share the "/admin" prefix (Projects lives at the
// bare /admin, Sprints/Submissions/Translations are siblings under it),
// so a simple prefix match would highlight Projects on every admin page.
// Picking the *longest* matching href across the whole nav resolves it.
function pickActiveHref(pathname: string, hrefs: string[]): string | null {
  let best: string | null = null;
  for (const href of hrefs) {
    const matches = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
    if (matches && (best === null || href.length > best.length)) {
      best = href;
    }
  }
  return best;
}

function NavLinkItem({
  link,
  isActive,
  onNavigate,
}: {
  link: NavLink;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
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
}

function SidebarNav({
  pathname,
  visionLinks,
  onNavigate,
}: {
  pathname: string;
  visionLinks: NavLink[];
  onNavigate?: () => void;
}) {
  const homeLink: NavLink = { href: '/', label: 'Home' };
  const allHrefs = [homeLink, ...visionLinks, ...ADMIN_LINKS].map((l) => l.href);
  const activeHref = pickActiveHref(pathname, allHrefs);

  return (
    <nav className="flex flex-1 flex-col gap-1">
      <NavLinkItem link={homeLink} isActive={activeHref === homeLink.href} onNavigate={onNavigate} />

      <p className="mt-4 mb-1 px-3 text-xs font-medium uppercase tracking-wide text-foreground/40">Vision</p>
      {visionLinks.map((link) => (
        <NavLinkItem key={link.href} link={link} isActive={activeHref === link.href} onNavigate={onNavigate} />
      ))}

      <p className="mt-4 mb-1 px-3 text-xs font-medium uppercase tracking-wide text-foreground/40">Admin</p>
      {ADMIN_LINKS.map((link) => (
        <NavLinkItem key={link.href} link={link} isActive={activeHref === link.href} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}
