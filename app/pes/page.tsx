import type { Metadata } from 'next';
import { getProjects } from '../../lib/projects';
import PesApp, { type PesProject } from './_components/PesApp';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Taufik — Portfolio Edition (prototype)',
  robots: { index: false, follow: false },
};

export default async function PesPage() {
  const all = await getProjects();
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

  return <PesApp projects={projects} />;
}
