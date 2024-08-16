'use server';

import { FormActionState } from '@/components/auth/reset-password';
import { verifyToken } from '@/lib/auth/jwt-token';
import prisma from '@/prisma/db';
import { resetPasswordSchema } from '@/schemas/authSchemas';
import { hashPassword } from '@/lib/auth/password-hashing';
import { CreateEmailOptions } from 'resend';
import ChangePasswordTemplate from '@/components/email/change-password-template';
import { sendEmail } from '@/lib/email/resend-email';

export const resetPassword = async (
  previousState: FormActionState,
  payload: FormData,
): Promise<FormActionState> => {
  try {
    const token = payload.get('token') as string;
    const password = payload.get('password');
    const confirmPassword = payload.get('confirmPassword');

    const validationResult = resetPasswordSchema.safeParse({
      confirmPassword,
      password,
    });

    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error?.flatten().fieldErrors,
      };
    }

    const verifiedToken = await verifyToken(token, 'email-verification');

    if (!verifiedToken) {
      return {
        success: false,
        message: 'Invalid or expired token.',
      };
    }

    const data = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { id: verifiedToken.payload.userId },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found.',
      };
    }

    const hashedPassword = await hashPassword(data.password);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    const configuration: CreateEmailOptions = {
      to: user.email,
      from: 'Password has been reset <support@resend.dev>',
      subject: 'Your password has been reset',
      react: ChangePasswordTemplate({
        loginLink: 'http://localhost:3000/login',
        supportLink: 'http://localhost:3000/contact-us',
      }),
    };

    await sendEmail(configuration);

    return {
      success: true,
      message: 'Password reset successfully.',
      redirect: '/login',
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message:
        error.message.substring(0, 100) ||
        'An error occurred while resetting your password.',
    };
  }
};
