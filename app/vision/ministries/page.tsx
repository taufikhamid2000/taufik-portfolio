import type { Metadata } from 'next';
import { getMinistries } from '../../../lib/vision';
import { getSiteUrl } from '../../../lib/site-url';
import { MinistriesList } from '../_components/MinistriesList';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Ministries — Vision for Malaysia',
  description: 'Every Malaysian government ministry mapped to real problems and the software that could address them.',
  alternates: {
    canonical: `${SITE_URL}/vision/ministries`,
    languages: { 'en-MY': `${SITE_URL}/vision/ministries`, 'ms-MY': `${SITE_URL}/ms/vision/ministries` },
  },
};

export default async function VisionMinistriesPage() {
  const ministries = await getMinistries('en');
  return <MinistriesList locale="en" ministries={ministries} siteUrl={SITE_URL} />;
}
