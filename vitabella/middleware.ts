import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle case-sensitive redirect for /DUPR and /DUPR/ to /dupr
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strict case-sensitive check for /DUPR and /DUPR/ only
  if (pathname === '/DUPR' || pathname === '/DUPR/') {
    const url = request.nextUrl.clone();
    url.pathname = '/dupr';
    return NextResponse.redirect(url, 308); // 308 preserves method and body
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

// Use a broad matcher so we can do strict checks in code (Vercel matchers are case-insensitive)
export const config = {
  matcher: '/:path*',
};
