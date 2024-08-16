import prisma from '@/prisma/db-edge';
import { verifyToken } from './jwt-token';
import { refreshTokens } from './refresh-tokens';

const revokeAllToken = async (userId: string) => {
  await prisma.refrehsToken.updateMany({
    where: {
      userId,
    },
    data: {
      is_revoked: true,
    },
  });
};

export const tokenRotation = async (oldRefreshToken: string) => {
  if (!oldRefreshToken) {
    return null;
  }

  try {
    const decodedToken = await verifyToken(oldRefreshToken, 'refresh');
    if (!decodedToken) {
      return null;
    }

    const storedToken = await prisma.refrehsToken.findFirst({
      where: {
        token: oldRefreshToken,
      },
      include: {
        user: true,
      },
    });

    if (!storedToken) {
      revokeAllToken(decodedToken.payload.userId);
    }

    const refreshedTokens = await refreshTokens(oldRefreshToken);

    if (!refreshedTokens) {
      return null;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    await prisma.$transaction([
      prisma.refrehsToken.update({
        where: {
          token: oldRefreshToken,
        },
        data: {
          is_revoked: true,
        },
      }),

      prisma.refrehsToken.create({
        data: {
          expiresAt: expiryDate,
          token: refreshedTokens.newRefreshToken,
          userId: storedToken?.userId!,
        },
      }),
    ]);

    return {
      newAccessToken: refreshedTokens.newAccessTokens,
      newRefreshToken: refreshedTokens.newRefreshToken,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
