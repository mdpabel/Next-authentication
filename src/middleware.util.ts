import { NextResponse } from 'next/server';

export const deleteCookie = (rcookieName: string, response: NextResponse) => {
  response.cookies.set(rcookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  });
};

export const setCookie = (
  cookieName: string,
  token: string,
  response: NextResponse,
) => {
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60,
  });
};
