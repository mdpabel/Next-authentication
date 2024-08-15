import { verifyEmail } from '@/actions/verify-email';

type Props = {
  searchParams: {
    token: string;
  };
};

const VerifyEmail = async ({ searchParams }: Props) => {
  if (!searchParams?.token) {
    throw new Error('Token is required');
  }

  await verifyEmail(searchParams.token);
};

export default VerifyEmail;
