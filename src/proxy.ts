import { NextResponse, NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Content Security Policy (CSP) - Production Grade
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com;
    img-src 'self' blob: data: https://images.unsplash.com https://*.googleusercontent.com https://*.svgrepo.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.googleapis.com;
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
