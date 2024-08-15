'use server';

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants';
import { deleteCookie } from '@/lib/auth/cookies';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  'use server';

  deleteCookie(ACCESS_TOKEN_NAME);
  deleteCookie(REFRESH_TOKEN_NAME);

  revalidatePath('/dashboard');
  redirect('/login');
};
