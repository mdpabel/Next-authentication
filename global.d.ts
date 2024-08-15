type JWTPayload = {
  userId: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  role: string;
  lastLogin: Date;
  iat: number;
  exp: number;
};
