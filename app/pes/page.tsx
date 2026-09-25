import type { Metadata } from 'next';
import { getIsOwner } from '../../lib/auth';
import { SITE } from '../../lib/site';
import { getProjects } from '../../lib/projects';
import { getSprints } from '../../lib/sprints';
import { getAllInitiatives, getMinistries } from '../../lib/vision';
import type { Locale } from '../../lib/i18n';
import PesApp, { type PesProject } from './_components/PesApp';
import type { PesLocale, PesSprint, PesVisionData } from './types';

export const metadata: Metadata = {
  title: 'Taufik — Portfolio Edition (prototype)',
  robots: { index: false, follow: false },
};

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

export default async function PesPage() {
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
        task_count: s.task_count,
        done_count: s.done_count,
      }))
    : [];

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

  return <PesApp projects={projects} vision={vision} sprints={sprints} isOwner={isOwner} site={SITE} />;
}
