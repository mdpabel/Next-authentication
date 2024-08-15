import { useEffect } from 'react';
import { FormActionState } from '../auth-form';
import { signupSchema } from '@/schemas/authSchemas';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type Form = UseFormReturn<
  | {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  | {
      email: string;
      password: string;
    },
  any,
  undefined
>;

export const useHandleFormErrors = (state: FormActionState, form: Form) => {
  useEffect(() => {
    if (state.error) {
      for (const key in state.error) {
        if (Object.prototype.hasOwnProperty.call(state.error, key)) {
          const message = state.error[key][0];
          const field = key as keyof z.infer<typeof signupSchema>;
          form.setError(field, {
            message,
            type: 'validate',
          });
        }
      }
    }
  }, [form, state]);
};
