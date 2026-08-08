import type { Metadata } from 'next';
import { getAllInitiatives } from '../../../../lib/vision';
import { getSiteUrl } from '../../../../lib/site-url';
import { InitiativesList } from '../../../vision/_components/InitiativesList';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Semua inisiatif — Wawasan untuk Malaysia',
  description: 'Setiap pasangan masalah-dan-idea daripada semua kementerian kerajaan Malaysia, di satu tempat.',
  alternates: {
    canonical: `${SITE_URL}/ms/vision/initiatives`,
    languages: { 'en-MY': `${SITE_URL}/vision/initiatives`, 'ms-MY': `${SITE_URL}/ms/vision/initiatives` },
  },
};

export default async function MsVisionInitiativesPage() {
  const initiatives = await getAllInitiatives('ms');
  return <InitiativesList locale="ms" initiatives={initiatives} siteUrl={SITE_URL} />;
}
