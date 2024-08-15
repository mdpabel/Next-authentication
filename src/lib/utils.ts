import { type ClassValue, clsx } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastMessage = (message: string, success: boolean) => {
  if (success) {
    toast.success(message, {
      position: 'top-right',
    });
  } else {
    toast.error(message, {
      position: 'top-right',
    });
  }
};
