import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from './constants';
import { deleteCookie, setCookie } from './middleware.util';
import { isAuthenticated } from './lib/auth/is-authenticated';

const privateRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup'];

const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const accessToken = req.cookies.get(ACCESS_TOKEN_NAME)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN_NAME)?.value;

  const authenticated = await isAuthenticated(accessToken!, refreshToken!);

  if (authenticated && authenticated.refreshedToken) {
    setCookie(ACCESS_TOKEN_NAME, authenticated.accessToken, res);
  }

  if (isAuthRoute && authenticated) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  if (isPrivateRoute && !authenticated) {
    const response = NextResponse.redirect(new URL('/login', nextUrl));
    deleteCookie(ACCESS_TOKEN_NAME, response);
    deleteCookie('refresh-token', response);
    return response;
  }

  return res;
};

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default middleware;
