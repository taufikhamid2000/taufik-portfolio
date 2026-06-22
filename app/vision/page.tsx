import type { Metadata } from 'next';
import { getMinistries } from '../../lib/vision';
import { getSiteUrl } from '../../lib/site-url';
import { VisionOverview } from './_components/VisionOverview';

export const revalidate = 300;

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Vision for Malaysia — Software for Every Ministry',
  description:
    'A planning board mapping Malaysian government ministries to software that can solve real problems — from education to housing to public services. Submit your own problem and idea.',
  alternates: {
    canonical: `${SITE_URL}/vision`,
    languages: { 'en-MY': `${SITE_URL}/vision`, 'ms-MY': `${SITE_URL}/ms/vision` },
  },
  openGraph: {
    title: 'Vision for Malaysia — Software for Every Ministry',
    description: 'Mapping Malaysian government ministries to software that can solve real problems.',
    url: `${SITE_URL}/vision`,
    type: 'website',
  },
};

export default async function VisionPage() {
  const ministries = await getMinistries('en');
  return <VisionOverview locale="en" ministries={ministries} siteUrl={SITE_URL} />;
}
