import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormActionState } from '@/components/auth/auth-form';

export const useHandleRedirections = (state: FormActionState) => {
  const router = useRouter();

  useEffect(() => {
    if (state.redirectResendEmailVerificationPage) {
      router.push('/resend-verification-email');
    }
  }, [state.redirectResendEmailVerificationPage, router]);

  useEffect(() => {
    if (state.redirect) {
      router.push(state.redirect!);
      router.refresh();
    }
  }, [router, state.redirect]);
};
