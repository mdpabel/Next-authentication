import { User } from '@prisma/client';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      lastLogin: Date;
      emailVerified: boolean;
    };
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    lastLogin: Date;
    emailVerified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    role: string;
    lastLogin: Date;
  }
}
