'use client';

import { useSession } from 'next-auth/react';

const ClientComponent = () => {
  const session = useSession();

  return <div>{JSON.stringify(session)}</div>;
};

export default ClientComponent;
