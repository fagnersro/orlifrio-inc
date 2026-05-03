import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/website', '/login', '/forgot-password', '/reset-password'];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/'),
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // Authenticated user trying to access login → send to home
  if (isAuthenticated && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Unauthenticated user trying to access a private route → send to login
  if (!isAuthenticated && !isPublic(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
