import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle case-sensitive redirect for /DUPR and /DUPR/ to /dupr
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only redirect if the path is exactly /DUPR or /DUPR/
  if (pathname === '/DUPR' || pathname === '/DUPR/') {
    const url = request.nextUrl.clone();
    url.pathname = '/dupr';
    return NextResponse.redirect(url, 308); // 308 preserves method and body
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

// Limit the middleware to only paths that could match /DUPR (case-sensitive)
export const config = {
  matcher: ['/DUPR', '/DUPR/'],
};
