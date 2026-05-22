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
 * Handles Supabase email verification links (password recovery, email
 * confirmation, magic links). Supabase appends ?token_hash=...&type=...
 * and we exchange the token for a session here.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/auth/update-password';

  if (!token_hash || !type) {
    return NextResponse.redirect(
      new URL('/auth/error?reason=missing_token', request.url)
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash });

  if (error) {
    return NextResponse.redirect(
      new URL(
        '/auth/error?reason=' + encodeURIComponent(error.message),
        request.url
      )
    );
  }

  // Session is now set via cookies. Redirect to wherever the flow needs.
  return NextResponse.redirect(new URL(next, request.url));
}
