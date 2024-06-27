import { FC } from 'react';
import { Skeleton } from '@/components/elements';

export const ProposedVehicleSkeleton: FC = () => {
  return (
      <div className="border rounded border-gray-200 w-full p-4">
        <Skeleton className='h-24' />
      </div>
  );
};
