import AuthForm from '@/components/auth/auth-form';
import React from 'react';
import { handleLogin } from '../../actions/login';

const Login = () => {
  return <AuthForm formType='login' action={handleLogin} />;
};

export default Login;
