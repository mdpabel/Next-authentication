'use server';

import { FormActionState } from '@/components/auth/forget-password';
import PasswordResetTemplate from '@/components/email/password-reset-template';
import { generateToken } from '@/lib/auth/jwt-token';
import { sendEmail } from '@/lib/email/resend-email';
import prisma from '@/prisma/db';
import { forgetPasswordSchema } from '@/schemas/authSchemas';
import { CreateEmailOptions } from 'resend';

export const forgetPassword = async (
  previousState: FormActionState,
  payload: FormData,
): Promise<FormActionState> => {
  try {
    const email = payload.get('email');

    const validationResult = forgetPasswordSchema.safeParse({
      email,
    });

    if (!validationResult.success) {
      const error = validationResult.error.flatten().fieldErrors;
      return {
        success: false,
        error,
      };
    }

    const data = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    if (existingUser && !existingUser.emailVerified) {
      return {
        success: false,
        message: 'Email not verified, please check your email',
      };
    }

    const resetPasswordToken = await generateToken(
      {
        userId: existingUser.id,
      },
      'email-verification',
    );

    const cofiguration: CreateEmailOptions = {
      from: 'Reset your password <support@resend.dev>',
      to: existingUser.email,
      subject: 'Reset your password',
      react: PasswordResetTemplate({
        resetLink: `http://localhost:3000/reset-password?token=${resetPasswordToken}`,
      }),
    };

    await sendEmail(cofiguration);

    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Something went wrong while logging in',
    };
  }
};
