'use client';

import { resetPasswordSchema } from '@/schemas/authSchemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import PasswordInputField from './password-field';
import FormButton from './form-button';
import { useFormState } from 'react-dom';
import { useHandleFormErrors } from './hooks/useHandleFormErrors';
import { useHandleRedirections } from './hooks/useHandleRedirections';
import { useHandleToastMessage } from './hooks/useHandleToastMessage';
import { zodResolver } from '@hookform/resolvers/zod';

export type FormActionState = {
  message?: string;
  error?: any;
  success: boolean;
  redirect?: string;
};

const initialState: FormActionState = {
  message: '',
  error: null,
  success: false,
  redirect: undefined,
};

export type ResetPasswordFormProps = {
  action: (
    previousState: FormActionState,
    payload: FormData,
  ) => Promise<FormActionState>;
  token: string;
};

const ResetPassword = ({ action, token }: ResetPasswordFormProps) => {
  const [state, formAction] = useFormState(action, initialState);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'onChange',
  });

  useHandleFormErrors(state, form);
  useHandleRedirections(state);
  useHandleToastMessage(state);

  return (
    <Form {...form}>
      <div className='flex justify-center items-center space-y-5 md:space-y-0 h-full'>
        <form
          action={(formData) => {
            formData.set('token', token);
            formAction(formData);
          }}
          noValidate
          className='space-y-5 shadow p-8 md:p-6 border w-full max-w-md'>
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInputField field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='confirmPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInputField
                    field={field}
                    placeholder='Confirm password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton formType='update-password' />
        </form>
      </div>
    </Form>
  );
};

export default ResetPassword;
