import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { generateToken, verifyToken } from './jwt-token';

export const refreshTokens = async (refreshToken: string) => {
  // const cookiesStore = cookies();
  // const refreshToken = cookiesStore.get(REFRESH_TOKEN_NAME)?.value;
  const decodedRefreshToken = await verifyToken(refreshToken!, 'refresh');

  try {
    const newAccessTokens = await generateToken(
      {
        userId: decodedRefreshToken.payload.userId,
      },
      'access',
    );
    const newRefreshToken = await generateToken(
      {
        userId: decodedRefreshToken.payload.userId,
      },
      'refresh',
    );
    return { newAccessTokens, newRefreshToken };
  } catch (error) {
    return null;
  }
};
