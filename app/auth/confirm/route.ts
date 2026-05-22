import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

// Subset of Supabase's EmailOtpType — the ones we route through /auth/confirm.
type EmailOtpType =
  | 'signup'
  | 'invite'
  | 'magiclink'
  | 'recovery'
  | 'email_change'
  | 'email';

/**
 * Handles Supabase email verification redirects. Supports both flows:
 *   1. PKCE flow:    ?code=...                  (default for new Supabase projects)
 *   2. Legacy flow:  ?token_hash=...&type=...   (older / custom email templates)
 *
 * On success, sets the session via cookies and redirects to ?next or
 * /auth/update-password (for recovery flows) by default.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get('next') ?? '/auth/update-password';

  const supabase = await createClient();

  // PKCE flow — newer Supabase default
  const code = searchParams.get('code');
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL('/auth/error?reason=' + encodeURIComponent(error.message), request.url)
      );
    }
    return NextResponse.redirect(new URL(next, request.url));
  }

  // Legacy flow — token_hash + type
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (error) {
      return NextResponse.redirect(
        new URL('/auth/error?reason=' + encodeURIComponent(error.message), request.url)
      );
    }
    return NextResponse.redirect(new URL(next, request.url));
  }

  return NextResponse.redirect(
    new URL('/auth/error?reason=' + encodeURIComponent('Missing code or token.'), request.url)
  );
}
