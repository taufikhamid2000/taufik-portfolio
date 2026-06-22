import type { MetadataRoute } from 'next';
import { getMinistrySlugs } from '../lib/vision';
import { getSiteUrl } from '../lib/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const slugs = await getMinistrySlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/vision`, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const ministryRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/vision/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...ministryRoutes];
}
