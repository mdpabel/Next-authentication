import NextAuth from 'next-auth';
import authConfig from './_auth.config';
import { User } from '@prisma/client';

export const { signIn, signOut, handlers, auth, unstable_update } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ account, user, token, profile, session }) {
      const userInfo = user as User;

      if (user) {
        token.firstName = userInfo.firstName;
        token.lastName = userInfo.lastName;
        token.email = userInfo.email;
        token.emailVerified = userInfo.emailVerified;
        token.role = userInfo.role;
        token.id = userInfo.id;
        token.lastLogin = userInfo.lastLogin;
      }
      return token;
    },

    async session({ session, token, user, newSession }) {
      if (token && session.user) {
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.emailVerified = !!token.emailVerified as any;
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.lastLogin = token.lastLogin as Date;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: 'access_token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      },
    },
  },
  ...authConfig,
});
