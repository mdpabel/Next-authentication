import { base64url, jwtVerify, JWTVerifyResult, SignJWT } from 'jose';

type Payload = {
  userId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  lastLogin?: Date;
  emailVerified?: boolean;
};

const generateSecret = (secret: string) => {
  return base64url.decode(secret);
};

export const generateToken = (
  payload: Payload,
  type: 'access' | 'refresh' | 'email-verification',
) => {
  const expirationTime =
    type === 'access' ? '5s' : type === 'refresh' ? '7d' : '1d';
  const secretKey =
    type === 'access'
      ? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
      : type === 'refresh'
      ? process.env.JWT_REFRESH_TOKEN_SECRET_KEY
      : process.env.JWT_EMAIL_VERIFICATION_TOKEN_SECRET_KEY;

  try {
    const token = new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(generateSecret(secretKey!));
    return token;
  } catch (error) {
    console.error('Error JWT token generation:', error);
    throw new Error('Error JWT token generation');
  }
};

export const verifyToken = async (
  token: string,
  type: 'access' | 'refresh' | 'email-verification',
): Promise<JWTVerifyResult<JWTPayload>> => {
  const secretKey =
    type === 'access'
      ? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
      : type === 'refresh'
      ? process.env.JWT_REFRESH_TOKEN_SECRET_KEY
      : process.env.JWT_EMAIL_VERIFICATION_TOKEN_SECRET_KEY;

  try {
    const res = await jwtVerify<JWTPayload>(token, generateSecret(secretKey!));

    return res;
  } catch (error: any) {
    console.error('Error JWT verification:', error);
    throw new Error('Error JWT verification');
  }
};
