import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

interface CookieToSet {
  name: string;
  value: string;
  options?: CookieOptions;
}

/**
 * Refresh the Supabase session in middleware so cookies stay current.
 * Returns the NextResponse with refreshed cookies attached.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_KEY)!,
    {
      db: { schema: 'public' },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: do not run any logic between createServerClient and getUser().
  // A simple mistake could make it very hard to debug session refresh issues.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ALLOWED_EMAILS = ['putrasabah41@gmail.com', 'taufikhamid2000@gmail.com'];
  const GOOGLE_ALLOWED_EMAILS = ['taufikhamid2000@gmail.com'];

  // If signed in but not on the allowlist, sign them out and bounce to login
  if (user && !ALLOWED_EMAILS.includes(user.email ?? '')) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '?error=' + encodeURIComponent('Access denied.');
    return NextResponse.redirect(url);
  }

  // Block Google sign-in for non-Google-allowlisted accounts.
  // Uses user.identities (not app_metadata.provider) because app_metadata.provider
  // reflects the account's *first* provider, not the current sign-in method —
  // so it stays 'email' even when the user signs in via Google on an email account.
  const hasGoogleIdentity = user?.identities?.some((id: { provider: string }) => id.provider === 'google') ?? false;
  if (user && hasGoogleIdentity && !GOOGLE_ALLOWED_EMAILS.includes(user.email ?? '')) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '?error=' + encodeURIComponent('Google sign-in not permitted for this account.');
    return NextResponse.redirect(url);
  }

  // /admin is public-read now (see lib/auth.ts) — no blanket redirect here.
  // Owner-only writes are gated per-page/per-action instead, backed by RLS.

  // If already logged in and hitting /login, send to /admin
  if (user && request.nextUrl.pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
