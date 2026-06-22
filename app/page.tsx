import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getProjects, type Project, type ProjectStatus } from '../lib/projects';
import { createClient } from '../lib/supabase/server';
import { ThemeToggle } from './_components/theme-toggle';

export const revalidate = 60; // re-fetch projects at most once per minute

interface HomeProps {
  searchParams: Promise<{ code?: string; error?: string; error_description?: string }>;
}

const statusStyles: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'in-portfolio': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  'in-portfolio': 'In Portfolio',
  concept: 'Concept',
  archived: 'Archived',
};

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-lg font-semibold">Taufik&apos;s Portfolio</span>
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
            {user ? (
              <Link
                href="/admin"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Admin
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Sign in
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Hi, I&apos;m Muhammad Taufik
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-balance">
            I build web and mobile applications. Here are some of the projects I&apos;ve worked on,
            ranging from full-stack platforms to mobile apps and concept prototypes.
          </p>
        </section>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {featured.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Featured</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {featured.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )}

            {others.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">All Projects</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {others.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-gray-600 dark:text-gray-400">
          Built with Next.js &amp; Tailwind CSS. &copy; {new Date().getFullYear()} Muhammad Taufik Bin Hamid.
        </div>
      </footer>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
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
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors flex flex-col">
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
            className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub &rarr;
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Live Demo &rarr;
          </a>
        )}
        {!project.github_url && !project.demo_url && (
          <Link
            href={`/projects/${project.name}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View in Portfolio &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}
