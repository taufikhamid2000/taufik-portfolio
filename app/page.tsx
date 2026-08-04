import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getProjects } from '../lib/projects';
import { AuthNav } from './_components/auth-nav';
import { ThemeToggle } from './_components/theme-toggle';
import Hero3DLoader from './_components/Hero3DLoader';
import ProjectCardTilt from './_components/ProjectCardTilt';
import Reveal from './_components/Reveal';
import TextScramble from './_components/TextScramble';
import ExpandProjects from './_components/ExpandProjects';

export const revalidate = 60; // re-fetch projects at most once per minute

interface HomeProps {
  searchParams: Promise<{ code?: string; error?: string; error_description?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  // If Supabase redirected here with ?code=... (because Site URL is configured
  // to the root, not /auth/confirm), bounce it to the proper handler so the
  // code can be exchanged for a session.
  if (params.code) {
    redirect(`/auth/confirm?code=${encodeURIComponent(params.code)}`);
  }
  // Similarly, surface auth errors via the dedicated page.
  if (params.error || params.error_description) {
    redirect(
      '/auth/error?reason=' +
        encodeURIComponent(params.error_description || params.error || 'Unknown error')
    );
  }

  const projects = await getProjects();

  // Show only a handful of highlights up front — a wall of every project
  // reads like a task list to review rather than a curated showcase.
  // Prefer `featured` projects; if fewer than HIGHLIGHT_COUNT are marked
  // featured, fill the remaining slots from the rest by display order.
  const HIGHLIGHT_COUNT = 3;
  const featuredProjects = projects.filter((p) => p.featured);
  const restProjects = projects.filter((p) => !p.featured);
  const highlights = [...featuredProjects, ...restProjects].slice(0, HIGHLIGHT_COUNT);
  const highlightIds = new Set(highlights.map((p) => p.id));
  const rest = projects.filter((p) => !highlightIds.has(p.id));

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
          <span className="text-lg font-semibold dark:bg-gradient-to-r dark:from-indigo-300 dark:to-cyan-300 dark:bg-clip-text dark:text-transparent">
            Taufik&apos;s Portfolio
          </span>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/vision"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Vision for Malaysia
            </Link>
            <a
              href="https://github.com/taufikhamid2000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              GitHub &rarr;
            </a>
            <Suspense fallback={null}>
              <AuthNav />
            </Suspense>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <section className="relative mb-16 overflow-hidden dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-10 dark:backdrop-blur-xl">
          <div aria-hidden="true" className="absolute inset-0 hidden dark:motion-safe:block">
            <Hero3DLoader />
          </div>
          <div className="relative z-10 sm:max-w-lg dark:[text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Hi, I&apos;m{' '}
              <TextScramble
                text="Muhammad Taufik"
                className="dark:bg-gradient-to-r dark:from-indigo-300 dark:via-cyan-300 dark:to-indigo-300 dark:bg-[length:200%_auto] dark:bg-clip-text dark:text-transparent dark:motion-safe:animate-gradient-shimmer"
              />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-balance">
              I build web and mobile applications. Here are some of the projects I&apos;ve worked on,
              ranging from full-stack platforms to mobile apps and concept prototypes.
            </p>
          </div>
        </section>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <section className="mb-10">
              <Reveal>
                <h2 className="text-2xl font-semibold mb-6">A Few Highlights</h2>
              </Reveal>
              <div className="project-grid grid gap-6 md:grid-cols-2">
                {highlights.map((project, i) => (
                  <Reveal key={project.id} delay={i * 80}>
                    <ProjectCardTilt project={project} />
                  </Reveal>
                ))}
              </div>
            </section>

            {rest.length > 0 && (
              <ExpandProjects count={rest.length}>
                <div className="project-grid grid gap-6 md:grid-cols-2">
                  {rest.map((project, i) => (
                    <Reveal key={project.id} delay={i * 80}>
                      <ProjectCardTilt project={project} />
                    </Reveal>
                  ))}
                </div>
              </ExpandProjects>
            )}
          </>
        )}
      </main>

      <footer className="relative z-10 border-t border-gray-200 dark:border-white/10 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-600 dark:text-gray-400">
          Built with Next.js &amp; Tailwind CSS. &copy; {new Date().getFullYear()} Muhammad Taufik Bin Hamid.
        </div>
      </footer>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-gray-300 dark:border-white/15 rounded-lg dark:rounded-2xl p-12 text-center dark:bg-white/[0.02] dark:backdrop-blur-xl">
      <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Add your first project from the admin panel.
      </p>
      <Link
        href="/admin"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Admin
      </Link>
    </div>
  );
}
