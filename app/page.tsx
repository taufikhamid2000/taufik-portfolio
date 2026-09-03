import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getProjects } from '../lib/projects';
import { THEME_COOKIE, isTheme } from '../lib/theme';
import { AuthNav } from './_components/auth-nav';
import { SiteShell } from './_components/SiteShell';
import HeroIntro from './_components/HeroIntro';
import ContactLinks from './_components/ContactLinks';
import Reveal from './_components/Reveal';
import ProjectWheel from './_components/ProjectWheel';

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

  const allProjects = await getProjects();
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(themeCookie) ? themeCookie : 'system';

  // 'concept' rows are idea stubs — they dilute the portfolio, so they never
  // appear publicly. 'archived' rows stay, but only in the collapsed list.
  const projects = allProjects.filter((p) => p.status !== 'concept');

  return (
    <SiteShell initialTheme={initialTheme} authSlot={<Suspense fallback={null}><AuthNav /></Suspense>}>
      <div className="animate-page-in">
        <HeroIntro />

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="mb-8 md:mb-10">
            <Reveal>
              <h2 className="text-xl md:text-2xl font-semibold mb-1">Explore my work</h2>
              <p className="text-sm text-foreground/60 mb-4 md:mb-6">
                Spin the wheel, or hit &ldquo;Surprise me&rdquo; and let it pick for you.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ProjectWheel projects={projects} />
            </Reveal>
          </section>
        )}

        <Reveal>
          <section
            aria-labelledby="contact-heading"
            className="mt-4 mb-8 border-t border-border pt-8 md:pt-10 dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/[0.03] dark:p-5 md:dark:p-8 dark:backdrop-blur-xl"
          >
            <h2 id="contact-heading" className="text-xl md:text-2xl font-semibold mb-2">
              Get in touch
            </h2>
            <p className="text-sm md:text-base text-foreground/65 text-balance mb-5 max-w-xl">
              Hiring for a full-stack or backend role, or want to talk through one of these
              projects? Drop me a line.
            </p>
            <ContactLinks />
          </section>
        </Reveal>
      </div>
    </SiteShell>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border rounded-2xl bg-muted/40 p-12 text-center">
      <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
      <p className="text-foreground/60 mb-4">
        Add your first project from the admin panel.
      </p>
      <Link
        href="/admin"
        className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
      >
        Go to Admin
      </Link>
    </div>
  );
}
