import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/signup'];

export default async function middleware(req: NextRequest) {
  console.log('Middleware triggered on path:', req.nextUrl.pathname);
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Cek apakah cookie sesi ada
  const sessionCookie = (await cookies()).get('session')?.value;

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isPublicRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
