import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { auth } from '@/lib/auth/auth';
import prisma from '@/prisma/db';
import { cookies } from 'next/headers';

const Dashboard = async () => {
  const session = await auth();
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

  return (
    <div>
      <div>
        <h2>Session</h2>
        <div className='max-w-full'>
          <div>Email: {session?.payload.email}</div>
          <div>FirstName: {session?.payload.firstName}</div>
          <div>LastName: {session?.payload.lastName}</div>
          <div>
            Last Login:{' '}
            {session?.payload.lastLogin &&
              new Date(session?.payload.lastLogin).toString()}
          </div>

          <div>
            Expires at:{' '}
            {session?.payload.exp &&
              new Date(session?.payload.exp * 1000).toString()}
          </div>

          <div className='break-words'>
            <strong>Access token:</strong> {accessToken}
          </div>
          <div className='break-words'>
            <strong>Refresh token:</strong> {refreshToken}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
