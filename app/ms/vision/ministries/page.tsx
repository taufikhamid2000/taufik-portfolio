import type { Metadata } from 'next';
import { getMinistries } from '../../../../lib/vision';
import { getSiteUrl } from '../../../../lib/site-url';
import { MinistriesList } from '../../../vision/_components/MinistriesList';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Kementerian — Wawasan untuk Malaysia',
  description: 'Setiap kementerian kerajaan Malaysia dipadankan dengan masalah sebenar dan perisian yang boleh menanganinya.',
  alternates: {
    canonical: `${SITE_URL}/ms/vision/ministries`,
    languages: { 'en-MY': `${SITE_URL}/vision/ministries`, 'ms-MY': `${SITE_URL}/ms/vision/ministries` },
  },
};

export default async function MsVisionMinistriesPage() {
  const ministries = await getMinistries('ms');
  return <MinistriesList locale="ms" ministries={ministries} siteUrl={SITE_URL} />;
}
