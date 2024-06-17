import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
