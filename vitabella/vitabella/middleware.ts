import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle case-sensitive redirect for /DUPR and /DUPR/ to /dupr
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Normalize: redirect any case-variant of /dupr or /dupr/ to /dupr
  const lower = pathname.toLowerCase();
  if ((lower === '/dupr' || lower === '/dupr/') && pathname !== '/dupr') {
    const url = request.nextUrl.clone();
    url.pathname = '/dupr';
    return NextResponse.redirect(url, 308);
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

// Use a broad matcher so we can do strict checks in code (Vercel matchers are case-insensitive)
export const config = {
  matcher: '/:path*',
};
