import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMinistryBySlug, getMinistrySlugs } from '../../../../lib/vision';
import { getSiteUrl } from '../../../../lib/site-url';
import { MinistryDetail } from '../../../vision/_components/MinistryDetail';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export async function generateStaticParams() {
  const slugs = await getMinistrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getMinistryBySlug(slug, 'ms');
  if (!data) return { title: 'Kementerian tidak dijumpai' };

  const title = `${data.ministry.name} — Penyelesaian Perisian | Wawasan untuk Malaysia`;
  const description = data.ministry.description ?? `Masalah dan idea perisian untuk ${data.ministry.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/ms/vision/${slug}`,
      languages: { 'en-MY': `${SITE_URL}/vision/${slug}`, 'ms-MY': `${SITE_URL}/ms/vision/${slug}` },
    },
    openGraph: { title, description, url: `${SITE_URL}/ms/vision/${slug}`, type: 'article' },
  };
}

export default async function MsMinistryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { submitted, error } = await searchParams;
  const data = await getMinistryBySlug(slug, 'ms');
  if (!data) notFound();

  return (
    <MinistryDetail
      locale="ms"
      slug={slug}
      ministry={data.ministry}
      initiatives={data.initiatives}
      submissions={data.submissions}
      submitted={submitted}
      error={error}
    />
  );
}
