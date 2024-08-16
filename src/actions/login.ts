'use server';

import { FormActionState } from '@/components/auth/auth-form';
import { loginSchema } from '@/schemas/authSchemas';
import prisma from '@/prisma/db';
import { comparePasswords } from '@/lib/auth/password-hashing';
import { generateToken } from '@/lib/auth/jwt-token';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { redirect } from 'next/navigation';
import { setCookie } from '@/lib/auth/cookies';

export const handleLogin = async (
  previousState: FormActionState,
  payload: FormData,
): Promise<FormActionState> => {
  try {
    const obj = {
      email: payload.get('email'),
      password: payload.get('password'),
    };
    const validationResult = loginSchema.safeParse(obj);

    if (!validationResult.success) {
      const error = validationResult.error?.flatten().fieldErrors;
      return {
        success: false,
        error,
      };
    }

    const data = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    if (user && !user.emailVerified) {
      return {
        success: false,
        message: 'Email not verified, please check your email',
      };
    }

    const isPasswordVerified = await comparePasswords(
      data.password,
      user.password,
    );

    if (!isPasswordVerified) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    const accessToken = await generateToken(
      {
        userId: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        lastLogin: user.lastLogin!,
      },
      'access',
    );

    const refreshToken = await generateToken(
      {
        userId: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        lastLogin: user.lastLogin!,
      },
      'refresh',
    );

    setCookie(ACCESS_TOKEN_NAME, accessToken);
    setCookie(REFRESH_TOKEN_NAME, refreshToken);

    return {
      success: true,
      message: 'Logged in successfully',
      redirect: '/dashboard',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Something went wrong while logging in',
    };
  }
};
