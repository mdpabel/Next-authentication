import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { cookies } from 'next/headers';

export const deleteCookie = (cookieName: string) => {
  const cookieStore = cookies();
  cookieStore.delete({
    name: cookieName,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
};

export const setCookie = (cookieName: string, token: string) => {
  const cookieStore = cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 15 * 60,
  });
};
