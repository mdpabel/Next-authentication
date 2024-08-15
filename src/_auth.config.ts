import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma/db';
import { loginSchema } from './schemas/authSchemas';
import { comparePasswords } from './lib/auth/password-hashing';

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user || !user.emailVerified) {
            return null;
          }

          const isValidPassword = await comparePasswords(
            password,
            user.password,
          );

          if (!isValidPassword) {
            return null;
          }

          await prisma.user.update({
            where: {
              email: user.email,
            },
            data: {
              lastLogin: new Date(),
            },
          });

          return user;
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
