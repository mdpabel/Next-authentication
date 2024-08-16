import { useEffect } from 'react';
import { toastMessage } from '@/lib/utils';
import { FormActionState } from '../auth-form';

export const useHandleToastMessage = (state: FormActionState) => {
  useEffect(() => {
    if (state.message) {
      toastMessage(state.message, state.success);
    }
  }, [state, state.message, state.success]);
};
