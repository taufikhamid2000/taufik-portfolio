import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabase from '../lib/supabaseClient';

export function middleware(req: NextRequest) {
  const session = supabase.auth.session();
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-route-path/:path*'], // Define paths to protect
};