import type { Metadata } from 'next';
import { getAllInitiatives } from '../../../lib/vision';
import { getSiteUrl } from '../../../lib/site-url';
import { InitiativesList } from '../_components/InitiativesList';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'All initiatives — Vision for Malaysia',
  description: 'Every problem-and-idea pair across every Malaysian government ministry, in one place.',
  alternates: {
    canonical: `${SITE_URL}/vision/initiatives`,
    languages: { 'en-MY': `${SITE_URL}/vision/initiatives`, 'ms-MY': `${SITE_URL}/ms/vision/initiatives` },
  },
};

export default async function VisionInitiativesPage() {
  const initiatives = await getAllInitiatives('en');
  return <InitiativesList locale="en" initiatives={initiatives} siteUrl={SITE_URL} />;
}
