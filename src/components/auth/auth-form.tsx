'use client';
import React, { useEffect } from 'react';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, signupSchema } from '@/schemas/authSchemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import FormButton from './form-button';
import { useFormState } from 'react-dom';
import { useHandleToastMessage } from './hooks/useHandleToastMessage';
import { useHandleFormErrors } from './hooks/useHandleFormErrors';
import { useHandleRedirections } from './hooks/useHandleRedirections';
import PasswordInputField from './password-field';
import Link from 'next/link';

export type FormActionState = {
  message?: string;
  error?: any;
  success: boolean;
  redirectResendEmailVerificationPage?: boolean;
  redirect?: string;
};

const initialState: FormActionState = {
  message: '',
  error: null,
  success: false,
  redirectResendEmailVerificationPage: false,
  redirect: undefined,
};

export type AuthFormProps = {
  formType: 'signup' | 'login';
  action: (
    previousState: FormActionState,
    payload: FormData,
  ) => Promise<FormActionState>;
};

const loginDefaultValues = {
  email: '',
  password: '',
};

const signupDefaultValues = {
  firstName: '',
  lastName: '',
  confirmPassword: '',
  ...loginDefaultValues,
};

const AuthForm = ({ action, formType }: AuthFormProps) => {
  const [state, formAction] = useFormState(action, initialState);
  const formSchema = formType === 'login' ? loginSchema : signupSchema;
  const defaultValues =
    formType === 'login' ? loginDefaultValues : signupDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });
  useHandleToastMessage(state);
  useHandleFormErrors(state, form);
  useHandleRedirections(state);

  return (
    <Form {...form}>
      <div className='flex justify-center items-center space-y-5 md:space-y-0 h-full'>
        <form
          action={formAction}
          // onSubmit={form.handleSubmit(formAction)}
          noValidate
          className='space-y-5 shadow p-8 md:p-6 border w-full max-w-md'>
          <div>
            <h1 className='text-2xl text-center'>
              {formType === 'signup'
                ? 'Create an Account'
                : 'Login to your Account'}
            </h1>
          </div>

          {formType === 'signup' && (
            <div className='flex md:flex-row flex-col md:space-x-4 space-y-4 md:space-y-0'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='text' placeholder='First Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='text' placeholder='Last Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='email' placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInputField field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formType === 'signup' && (
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormButton formType={formType} />

          {formType === 'login' ? (
            <p>
              Don&apos;t have an account? <Link href='/signup'>Sign up</Link>
            </p>
          ) : formType === 'signup' ? (
            <p>
              Already have an account? <Link href='/login'>Login</Link>
            </p>
          ) : null}
        </form>
      </div>
    </Form>
  );
};

export default AuthForm;
