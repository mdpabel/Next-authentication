import { useEffect } from 'react';
import { FormActionState } from '../auth-form';
import { signupSchema } from '@/schemas/authSchemas';
import { z } from 'zod';

export const useHandleFormErrors = (state: FormActionState, form: any) => {
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
