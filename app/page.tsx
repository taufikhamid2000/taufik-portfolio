import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getIsOwner } from '../lib/auth';
import { SITE } from '../lib/site';
import { getProjects } from '../lib/projects';
import { getSprints } from '../lib/sprints';
import { getAllInitiatives, getMinistries } from '../lib/vision';
import type { Locale } from '../lib/i18n';
import PesApp, { type PesProject } from './pes/_components/PesApp';
import type { PesLocale, PesSprint, PesVisionData } from './pes/types';

interface HomeProps {
  searchParams: Promise<{ code?: string; error?: string; error_description?: string }>;
}

async function loadVision(locale: Locale): Promise<PesVisionData> {
  const [ministries, initiatives] = await Promise.all([getMinistries(locale), getAllInitiatives(locale)]);
  return {
    ministries: ministries.map((m) => ({
      id: m.id,
      slug: m.slug,
      name: m.name,
      description: m.description,
      initiative_count: m.initiative_count,
    })),
    initiatives: initiatives.map((i) => ({
      id: i.id,
      ministry_slug: i.ministry.slug,
      ministry_name: i.ministry.name,
      problem: i.problem,
      idea: i.idea,
      status: i.status,
      project_name: i.project?.name ?? null,
      demo_url: i.project?.demo_url ?? null,
      github_url: i.project?.github_url ?? null,
    })),
  };
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

  const [all, isOwner, en, ms] = await Promise.all([
    getProjects(),
    getIsOwner(),
    loadVision('en'),
    loadVision('ms'),
  ]);

  // Sprints are owner-only in the database (RLS); only fetch and ship them
  // to the client when the visitor is the owner, so nothing leaks otherwise.
  const sprints: PesSprint[] = isOwner
    ? (await getSprints()).map((s) => ({
        id: s.id,
        name: s.name,
        goal: s.goal,
        start_date: s.start_date,
        end_date: s.end_date,
        status: s.status,
        tasks: s.tasks.map((t) => ({ id: t.id, title: t.title, status: t.status, priority: t.priority, effort: t.effort })),
        task_count: s.task_count,
        done_count: s.done_count,
      }))
    : [];

  // 'concept' rows are idea stubs — they never appear publicly.
  const projects: PesProject[] = all
    .filter((p) => p.status !== 'concept')
    .map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      tech: p.tech,
      github_url: p.github_url,
      demo_url: p.demo_url,
      image_url: p.image_url,
      featured: p.featured,
      status: p.status,
    }));

  const vision: Record<PesLocale, PesVisionData> = { en, ms };
  const listed = projects.filter((p) => p.status !== 'archived');

  return (
    <>
      <PesApp projects={projects} vision={vision} sprints={sprints} isOwner={isOwner} site={SITE} />

      {/* Real, crawlable text for search engines, screen readers and no-JS
          visitors: the same content the menu presents, in plain HTML. */}
      <div className="sr-only">
        <h1>
          {SITE.name} &mdash; {SITE.role}
        </h1>
        <p>
          {SITE.role} based in {SITE.location}. {SITE.availability}. Contact: {SITE.email}.
        </p>
        <h2>Projects</h2>
        <ul>
          {listed.map((p) => (
            <li key={p.id}>
              {p.demo_url ? <a href={p.demo_url}>{p.name}</a> : p.name}: {p.tagline}
            </li>
          ))}
        </ul>
        <nav aria-label="More">
          <Link href="/classic">Classic site</Link> <Link href="/vision">Improving Malaysia through software</Link>
        </nav>
      </div>
    </>
  );
}
