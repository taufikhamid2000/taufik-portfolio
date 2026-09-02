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

// One shell for the whole site. The sidebar is section-scoped so internal
// tooling never leaks into the public portfolio:
//   - Vision (Overview/Ministries/Initiatives) only under /vision, /ms/vision
//   - Admin (Projects/Sprints/Submissions/Translations) only under
//     /admin, /login, /auth — see lib/auth.ts for the owner-only write gate
// The home page has neither group, so it renders as a full-width centered
// column with no sidebar or hamburger; the footer links to the Vision
// side project so it stays discoverable.
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
  const isAdminSection =
    pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/auth');
  const showSidebar = isVisionSection || isAdminSection;
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
          {showSidebar && (
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
          )}
          <Link
            href="/"
            className="text-sm font-semibold dark:bg-gradient-to-r dark:from-indigo-300 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent"
          >
            Muhammad Taufik
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
        {showSidebar && (
          <>
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
              aria-label="Site navigation"
              className={`fixed top-14 bottom-0 left-0 z-30 flex w-64 flex-col overflow-y-auto border-r border-border bg-background px-4 py-4 shadow-xl transition-transform duration-200 md:hidden ${
                open ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <SidebarNav
                pathname={pathname}
                visionLinks={visionLinks}
                showVision={isVisionSection}
                showAdmin={isAdminSection}
                onNavigate={() => setOpen(false)}
              />
            </aside>

            <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto border-r border-border bg-background px-4 py-6 md:flex">
              <SidebarNav
                pathname={pathname}
                visionLinks={visionLinks}
                showVision={isVisionSection}
                showAdmin={isAdminSection}
              />
            </aside>
          </>
        )}

        <main id="main-content" className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 py-12">
          {children}
        </main>
      </div>

      <footer className="relative z-10 border-t border-border">
        <div className="flex flex-col items-center gap-2 px-6 py-8 text-center text-sm text-foreground/60">
          <nav aria-label="Side projects" className="text-xs text-foreground/50">
            <span>Side project: </span>
            <Link
              href="/vision"
              className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Malaysia Vision explorer
            </Link>
          </nav>
          <p>
            Built with Next.js &amp; Tailwind CSS. &copy; {new Date().getFullYear()} Muhammad Taufik Bin Hamid.
          </p>
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
    >
      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Collapsible nav group — same CSS grid-template-rows disclosure trick as
// ExpandProjects (see DESIGN.md), just driven by section state here
// instead of a one-shot local toggle.
function SidebarGroup({
  label,
  links,
  isOpen,
  onToggle,
  activeHref,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  isOpen: boolean;
  onToggle: () => void;
  activeHref: string | null;
  onNavigate?: () => void;
}) {
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground/40 transition-colors hover:text-foreground/70"
      >
        <ChevronIcon open={isOpen} />
        {label}
      </button>
      <div className="grid transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 pt-1">
            {links.map((link) => (
              <NavLinkItem key={link.href} link={link} isActive={activeHref === link.href} onNavigate={onNavigate} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  pathname,
  visionLinks,
  showVision,
  showAdmin,
  onNavigate,
}: {
  pathname: string;
  visionLinks: NavLink[];
  showVision: boolean;
  showAdmin: boolean;
  onNavigate?: () => void;
}) {
  const homeLink: NavLink = { href: '/', label: 'Home' };
  const allHrefs = [
    homeLink,
    ...(showVision ? visionLinks : []),
    ...(showAdmin ? ADMIN_LINKS : []),
  ].map((l) => l.href);
  const activeHref = pickActiveHref(pathname, allHrefs);

  const visionActive = pathname.startsWith('/vision') || pathname.startsWith('/ms/vision');
  const adminActive = pathname.startsWith('/admin');

  const [openGroups, setOpenGroups] = useState({ vision: visionActive, admin: adminActive });
  const [lastPathname, setLastPathname] = useState(pathname);

  // Landing directly on a section (typed URL, link from elsewhere) should
  // expand that group even if it was previously collapsed — but doesn't
  // fight a group the visitor collapsed on purpose while browsing within
  // a different section. Adjusted during render (not an effect) per
  // React's guidance for state that depends on a prop change.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenGroups((prev) => ({
      vision: prev.vision || visionActive,
      admin: prev.admin || adminActive,
    }));
  }

  return (
    <nav className="flex flex-1 flex-col gap-1">
      <NavLinkItem link={homeLink} isActive={activeHref === homeLink.href} onNavigate={onNavigate} />

      {showVision && (
        <SidebarGroup
          label="Vision"
          links={visionLinks}
          isOpen={openGroups.vision}
          onToggle={() => setOpenGroups((prev) => ({ ...prev, vision: !prev.vision }))}
          activeHref={activeHref}
          onNavigate={onNavigate}
        />
      )}

      {showAdmin && (
        <SidebarGroup
          label="Admin"
          links={ADMIN_LINKS}
          isOpen={openGroups.admin}
          onToggle={() => setOpenGroups((prev) => ({ ...prev, admin: !prev.admin }))}
          activeHref={activeHref}
          onNavigate={onNavigate}
        />
      )}
    </nav>
  );
}
