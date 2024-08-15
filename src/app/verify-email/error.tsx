'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col justify-center items-center gap-4 h-full'>
      <h2>{error.message || 'Something went wrong!'}</h2>
    </div>
  );
}
