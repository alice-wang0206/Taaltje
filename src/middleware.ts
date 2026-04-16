import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

const PROTECTED_PATHS = ['/community', '/profile', '/api/community', '/api/progress', '/api/daily', '/api/chat'];

export async function middleware(request: NextRequest) {
  const isProtected = PROTECTED_PATHS.some(p => request.nextUrl.pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('token')?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set('x-user-id', String(payload.userId));
  response.headers.set('x-user-role', payload.role);
  response.headers.set('x-username', payload.username);
  return response;
}

export const config = {
  matcher: [
    '/community/:path*',
    '/profile/:path*',
    '/api/community/:path*',
    '/api/progress/:path*',
    '/api/daily/:path*',
    '/api/chat',
  ],
};
