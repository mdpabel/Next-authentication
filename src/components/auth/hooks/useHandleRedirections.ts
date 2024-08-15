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
    if (state.redirectAfterLogin) {
      router.push(state.redirectAfterLogin!);
      router.refresh();
    }
  }, [router, state.redirectAfterLogin]);
};
