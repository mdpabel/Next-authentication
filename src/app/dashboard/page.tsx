import { auth } from '@/lib/auth/auth';
import prisma from '@/prisma/db';

const Dashboard = async () => {
  const session = await auth();

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session?.user?.email!,
  //   },
  //   select: {
  //     email: true,
  //     firstName: true,
  //     lastName: true,
  //     lastLogin: true,
  //   },
  // });

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
