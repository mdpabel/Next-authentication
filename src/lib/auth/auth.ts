import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { verifyToken } from './jwt-token';
import { cache } from 'react';
import { isAuthenticated } from './is-authenticated';

export const auth = cache(async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!accessToken) {
      return null;
    }

    const decodedToken = await isAuthenticated(accessToken!, refreshToken!);
    if (decodedToken) {
      return await verifyToken(decodedToken.accessToken, 'access');
    }
  } catch (error) {
    return null;
  }
});
