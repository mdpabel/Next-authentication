import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { generateToken, verifyToken } from './jwt-token';
import prisma from '@/prisma/db';

export const refreshTokens = async (refreshToken: string) => {
  // const cookiesStore = cookies();
  // const refreshToken = cookiesStore.get(REFRESH_TOKEN_NAME)?.value;
  const decodedRefreshToken = await verifyToken(refreshToken!, 'refresh');

  try {
    const newAccessTokens = await generateToken(
      {
        userId: decodedRefreshToken.payload.userId,
        email: decodedRefreshToken.payload.email,
        emailVerified: decodedRefreshToken.payload.emailVerified,
        firstName: decodedRefreshToken.payload.firstName,
        lastName: decodedRefreshToken.payload.lastName,
        role: decodedRefreshToken.payload.role,
        lastLogin: decodedRefreshToken.payload.lastLogin!,
      },
      'access',
    );

    const newRefreshToken = await generateToken(
      {
        userId: decodedRefreshToken.payload.userId,
        email: decodedRefreshToken.payload.email,
        emailVerified: decodedRefreshToken.payload.emailVerified,
        firstName: decodedRefreshToken.payload.firstName,
        lastName: decodedRefreshToken.payload.lastName,
        role: decodedRefreshToken.payload.role,
        lastLogin: decodedRefreshToken.payload.lastLogin!,
      },
      'refresh',
    );
    return { newAccessTokens, newRefreshToken };
  } catch (error) {
    return null;
  }
};
