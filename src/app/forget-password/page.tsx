import { forgetPassword } from '@/actions/forget-password';
import ForgetPassword from '@/components/auth/forget-password';
import React from 'react';

const page = () => {
  return <ForgetPassword action={forgetPassword} />;
};

export default page;
