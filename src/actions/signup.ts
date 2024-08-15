'use server';

import { FormActionState } from '@/components/auth/auth-form';
import EmailVerificationTemplate from '@/components/email/email-verification-template';
import { generateToken } from '@/lib/auth/jwt-token';
import { hashPassword } from '@/lib/auth/password-hashing';
import { sendEmail } from '@/lib/email/resend-email';
import prisma from '@/prisma/db';
import { signupSchema } from '@/schemas/authSchemas';
import { CreateEmailOptions } from 'resend';

export const handleSignup = async (
  previousState: FormActionState,
  payload: FormData,
): Promise<FormActionState> => {
  const firstName = payload.get('firstName');
  const lastName = payload.get('lastName');
  const email = payload.get('email');
  const password = payload.get('password');
  const confirmPassword = payload.get('confirmPassword');

  const obj = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  try {
    const validationResult = signupSchema.safeParse(obj);

    if (!validationResult.success) {
      const error = validationResult.error?.flatten().fieldErrors;
      return {
        error,
        success: false,
      };
    }

    const data = validationResult.data;

    const exisitingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (exisitingUser && !exisitingUser.emailVerified) {
      return {
        message: `User already exists but the email isn't verified. Please check your email or resend the verification link`,
        success: false,
        redirectResendEmailVerificationPage: true,
      };
    }

    if (exisitingUser) {
      return {
        message: 'User already exists',
        success: false,
      };
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    const token = await generateToken(
      {
        userId: newUser.id,
      },
      'email-verification',
    );

    const configuration: CreateEmailOptions = {
      from: 'no-reply <support@resend.dev>',
      to: newUser.email,
      subject: 'Welcome to Our Platform',
      react: EmailVerificationTemplate({
        verificationLink: `http://localhost:3000/verify-email?token=${token}`,
      }),
    };

    await sendEmail(configuration);

    return {
      success: true,
      error: '',
      message:
        'Your account has been successfully created! Please check your email to verify your email.',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
