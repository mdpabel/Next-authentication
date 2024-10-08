import { verifyToken } from './jwt-token';
import { refreshTokens } from './refresh-tokens';

export const isAuthenticated = async (
  accessToken: string,
  refreshToken: string,
) => {
  if (!accessToken && !refreshToken) {
    return null;
  }

  try {
    const payload = await verifyToken(accessToken!, 'access');
    return {
      payload,
      accessToken,
      refreshToken,
      refreshedToken: false,
    };
  } catch (error) {
    if (refreshToken) {
      const newTokens = await refreshTokens(refreshToken);

      if (newTokens) {
        const payload = await verifyToken(newTokens.newAccessTokens!, 'access');
        return {
          payload,
          accessToken: newTokens.newAccessTokens!,
          refreshToken: newTokens.newRefreshToken,
          refreshedToken: true,
        };
      }
    }
    return null;
  }
};
