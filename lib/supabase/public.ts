import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Cookieless, anon-key Supabase client for PUBLIC reads only.
 * Safe to call at build time (generateStaticParams, sitemap) where there is
 * no request/cookie context. RLS still governs access (public-read tables only).
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    { db: { schema: 'public' }, auth: { persistSession: false } }
  );
}
