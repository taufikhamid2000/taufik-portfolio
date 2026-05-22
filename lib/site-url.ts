/**
 * Returns the absolute base URL of this deployment.
 * Priority: NEXT_PUBLIC_SITE_URL → VERCEL_URL → localhost.
 * Always returns a URL with no trailing slash.
 */
export function getSiteUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ??
    'http://localhost:3000';
  if (!url.startsWith('http')) url = `https://${url}`;
  if (url.endsWith('/')) url = url.slice(0, -1);
  return url;
}
