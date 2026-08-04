import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getProjects, type Project, type ProjectStatus } from '../lib/projects';
import { AuthNav } from './_components/auth-nav';
import { ThemeToggle } from './_components/theme-toggle';
import Hero3DLoader from './_components/Hero3DLoader';

export const revalidate = 60; // re-fetch projects at most once per minute

interface HomeProps {
  searchParams: Promise<{ code?: string; error?: string; error_description?: string }>;
}

const statusStyles: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300',
  'in-portfolio': 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-white/5 dark:text-gray-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400',
};

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  'in-portfolio': 'In Portfolio',
  concept: 'Concept',
  archived: 'Archived',
};

// Deterministic gradient per card (no project imagery in the data model
// yet), so each card gets a distinct visual header instead of a flat box.
const cardGradients = [
  'from-indigo-500 to-cyan-400',
  'from-fuchsia-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-violet-500 to-pink-400',
  'from-amber-500 to-rose-400',
  'from-sky-500 to-indigo-400',
];

function gradientForProject(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return cardGradients[hash % cardGradients.length];
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
              Hi, I&apos;m Muhammad Taufik
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
              <h2 className="text-2xl font-semibold mb-6">A Few Highlights</h2>
              <div className="project-grid grid gap-6 md:grid-cols-2">
                {highlights.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {rest.length > 0 && (
              <details className="group mb-16">
                <summary className="cursor-pointer select-none list-none text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors inline-flex items-center gap-1.5">
                  <span className="inline-block transition-transform group-open:rotate-90">
                    &rsaquo;
                  </span>
                  View all projects ({rest.length} more)
                </summary>
                <div className="project-grid grid gap-6 md:grid-cols-2 mt-6">
                  {rest.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </details>
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl transition-[opacity,border-color] hover:border-gray-300 dark:bg-white/[0.03] dark:backdrop-blur-xl dark:hover:border-indigo-400/50 flex flex-col">
      <div className={`h-20 bg-gradient-to-br ${gradientForProject(project.id)} opacity-80 dark:opacity-70`} aria-hidden="true" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.tagline}</p>
        <p className="text-sm mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-cyan-300 hover:underline"
            >
              GitHub &rarr;
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-cyan-300 hover:underline"
            >
              Live Demo &rarr;
            </a>
          )}
          {!project.github_url && !project.demo_url && (
            <Link
              href={`/projects/${project.name}`}
              className="text-blue-600 dark:text-cyan-300 hover:underline"
            >
              View in Portfolio &rarr;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
