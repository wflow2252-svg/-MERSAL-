import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 1. Get Session Token
  const token = await getToken({ 
    req: request as any, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const { pathname } = url;

  // 2. Mandatory Onboarding Redirect Logic
  // If logged in but NOT onboarded, force redirect to /onboarding
  if (token && !token.isOnboarded) {
    if (pathname !== '/onboarding' && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
      url.pathname = '/onboarding';
      return NextResponse.redirect(url);
    }
  }

  // 3. Prevent Onboarded users from visiting onboarding again
  if (token && token.isOnboarded && pathname === '/onboarding') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  // 4. Security Headers (CSP, etc.)
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
