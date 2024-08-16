'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { forgetPasswordSchema } from '@/schemas/authSchemas';
import { Input } from '../ui/input';
import FormButton from './form-button';
import { useFormState } from 'react-dom';
import { useHandleFormErrors } from './hooks/useHandleFormErrors';
import { useHandleToastMessage } from './hooks/useHandleToastMessage';
import { useHandleRedirections } from './hooks/useHandleRedirections';
import { zodResolver } from '@hookform/resolvers/zod';

export type FormActionState = {
  message?: string;
  error?: any;
  success: boolean;
  redirect?: string;
};

export type AuthFormProps = {
  action: (
    previousState: FormActionState,
    payload: FormData,
  ) => Promise<FormActionState>;
};

const initialState: FormActionState = {
  success: true,
  redirect: undefined,
  error: null,
  message: '',
};

const ForgetPassword = ({ action }: AuthFormProps) => {
  const [state, formAction] = useFormState(action, initialState);

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  useHandleFormErrors(state, form);
  useHandleToastMessage(state);
  useHandleRedirections(state);

  return (
    <Form {...form}>
      <div className='flex justify-center items-center space-y-5 md:space-y-0 h-full'>
        <form
          action={formAction}
          noValidate
          className='space-y-5 shadow p-8 md:p-6 border w-full max-w-md'>
          <div>
            <h1 className='text-2xl text-center'>Forgot your password?</h1>
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='email' placeholder='Email...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton formType='forget-password' />
        </form>
      </div>
    </Form>
  );
};

export default ForgetPassword;
