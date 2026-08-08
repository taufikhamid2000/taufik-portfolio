import type { MetadataRoute } from 'next';
import { getMinistrySlugs } from '../lib/vision';
import { getSiteUrl } from '../lib/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const slugs = await getMinistrySlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/vision`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ms/vision`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/vision/ministries`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/ms/vision/ministries`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/vision/initiatives`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/ms/vision/initiatives`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const ministryRoutes: MetadataRoute.Sitemap = slugs.flatMap((slug) => [
    { url: `${base}/vision/${slug}`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/ms/vision/${slug}`, changeFrequency: 'weekly' as const, priority: 0.7 },
  ]);

  return [...staticRoutes, ...ministryRoutes];
}
