import type { Metadata } from 'next';
import { getMinistries } from '../../../lib/vision';
import { getSiteUrl } from '../../../lib/site-url';
import { VisionOverview } from '../../vision/_components/VisionOverview';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Wawasan untuk Malaysia — Perisian untuk Setiap Kementerian',
  description:
    'Papan perancangan yang memetakan kementerian kerajaan Malaysia kepada perisian yang boleh menyelesaikan masalah sebenar — daripada pendidikan ke perumahan dan perkhidmatan awam. Hantar masalah dan idea anda sendiri.',
  alternates: {
    canonical: `${SITE_URL}/ms/vision`,
    languages: { 'en-MY': `${SITE_URL}/vision`, 'ms-MY': `${SITE_URL}/ms/vision` },
  },
  openGraph: {
    title: 'Wawasan untuk Malaysia — Perisian untuk Setiap Kementerian',
    description: 'Memetakan kementerian kerajaan Malaysia kepada perisian yang boleh menyelesaikan masalah sebenar.',
    url: `${SITE_URL}/ms/vision`,
    type: 'website',
  },
};

export default async function MsVisionPage() {
  const ministries = await getMinistries('ms');
  return <VisionOverview locale="ms" ministries={ministries} siteUrl={SITE_URL} />;
}
