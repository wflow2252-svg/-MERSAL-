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

  // 2. Security Guard: Admin & Vendor Dashboard Protection
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor/dashboard')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    
    // Admin check for admin routes
    if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // 3. Mandatory Onboarding Logic (Smarter Check)
  // Only redirect if they are logged in, NOT onboarded, and trying to access main app pages
  // (Exclude static files, API, and the onboarding page itself)
  const isProtectedPath = !pathname.startsWith('/onboarding') && 
                          !pathname.startsWith('/api') && 
                          !pathname.startsWith('/_next') && 
                          pathname !== '/favicon.ico' &&
                          pathname !== '/login';

  if (token && !token.isOnboarded && isProtectedPath) {
    url.pathname = '/onboarding';
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  // 4. Content Security Policy (CSP) & Sovereign Headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com;
    img-src 'self' blob: data: https://images.unsplash.com https://*.googleusercontent.com https://*.svgrepo.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.googleapis.com https://ipapi.co;
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
