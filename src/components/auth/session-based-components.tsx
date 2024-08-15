import { auth } from '@/lib/auth/auth';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const SignedOut = async ({ children }: Props) => {
  const session = await auth();

  if (session) return null;

  return <>{children}</>;
};

export const SignedIn = async ({ children }: Props) => {
  const session = await auth();

  if (!session) return null;

  return <>{children}</>;
};
