import AuthForm from '@/components/auth/auth-form';
import React from 'react';
import { handleSignup } from '@/actions/signup';

const Signup = () => {
  return <AuthForm formType='signup' action={handleSignup} />;
};

export default Signup;
