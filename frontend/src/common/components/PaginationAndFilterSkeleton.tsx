import { FC, ReactNode } from 'react';

import { Skeleton } from '@/components/elements';

type Props = {
  children: ReactNode;
};

export const PaginationAndFilterSkeleton: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between pb-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex flex-row gap-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {children}

      <div className="flex flex-col items-center justify-center gap-4 py-5 md:flex-row md:justify-between">
        <Skeleton className="h-8 w-36" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-11" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    </div>
  );
};
