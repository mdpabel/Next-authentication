'use server';
import WelcomeEmailTemplate from '@/components/email/welcome-email-template';
import { verifyToken } from '@/lib/auth/jwt-token';
import { sendEmail } from '@/lib/email/resend-email';
import prisma from '@/prisma/db';
import { redirect } from 'next/navigation';
import { CreateEmailOptions } from 'resend';

export const verifyEmail = async (token: string) => {
  try {
    const {
      payload: { userId },
    } = await verifyToken(token, 'email-verification');

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.error('User not found.');
      return redirect('/login');
    }

    if (user.emailVerified) {
      console.error('Email already verified.');
      return redirect('/login');
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: true,
      },
    });

    const configuration: CreateEmailOptions = {
      from: 'no-reply <support@resend.dev>',
      to: user.email,
      subject: 'Welcome to our platform',
      react: WelcomeEmailTemplate({
        dashboardLink: '/dashboard',
        userName: user.firstName + ' ' + user.lastName,
      }),
    };

    await sendEmail(configuration);

    return redirect('/login');
  } catch (error: any) {
    console.error(error.message || 'Invalid or expired token.');
    return redirect('/login');
  }
};
