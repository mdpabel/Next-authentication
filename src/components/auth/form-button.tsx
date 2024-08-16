'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { AuthFormProps } from './auth-form';
import Spinner from '../common/spinner';
import Link from 'next/link';

const FormButton = ({
  formType,
}: {
  formType: AuthFormProps['formType'] | 'forget-password' | 'update-password';
}) => {
  const { pending } = useFormStatus();

  const btnText =
    formType === 'login'
      ? 'Login'
      : formType === 'signup'
      ? 'Signup'
      : formType === 'forget-password'
      ? 'Reset password'
      : formType === 'update-password'
      ? 'Update password'
      : 'submit';

  return (
    <div className='flex justify-between items-center space-x-4'>
      <Button type='submit'>
        {btnText}
        {pending && <Spinner />}
      </Button>
      {formType === 'login' && (
        <p className='text-center'>
          <Link href='/forget-password'>Forget password?</Link>
        </p>
      )}
    </div>
  );
};

export default FormButton;
