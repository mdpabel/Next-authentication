'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { AuthFormProps } from './auth-form';
import Spinner from '../common/spinner';

const FormButton = ({ formType }: { formType: AuthFormProps['formType'] }) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit'>
      {formType === 'login' ? 'Login' : 'Signup'}
      {pending && <Spinner />}
    </Button>
  );
};

export default FormButton;
