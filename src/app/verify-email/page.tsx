import WelcomeEmailTemplate from '@/components/email/welcome-email-template';
import { verifyToken } from '@/lib/auth/jwt-token';
import { sendEmail } from '@/lib/email/resend-email';
import prisma from '@/prisma/db';
import { redirect } from 'next/navigation';
import { CreateEmailOptions } from 'resend';

type Props = {
  searchParams: {
    token: string;
  };
};

const VerifyEmail = async ({ searchParams }: Props) => {
  try {
    const {
      payload: { userId },
    } = await verifyToken(searchParams?.token, 'email-verification');

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
      subject: 'Email verification',
      react: WelcomeEmailTemplate({
        dashboardLink: '/dashboard',
        userName: user.firstName + ' ' + user.lastName,
      }),
    };

    const res = await sendEmail(configuration);

    return redirect('/login');
  } catch (error: any) {
    console.error(error.message || 'Invalid or expired token.');
    return redirect('/login');
  }
};

export default VerifyEmail;
