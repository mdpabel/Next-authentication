import { resetPassword } from '@/actions/reset-password';
import ResetPassword from '@/components/auth/reset-password';
import React from 'react';

type Props = {
  searchParams: {
    token: string;
  };
};

const page = ({ searchParams }: Props) => {
  return <ResetPassword action={resetPassword} token={searchParams.token} />;
};

export default page;
