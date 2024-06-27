import { FC } from 'react';
import { Skeleton } from '@/components/elements';
import { ProposedVehicleSkeleton } from './ProposedVehicleSkeleton';

export const ProposedVehiclesSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProposedVehicleSkeleton />
      <ProposedVehicleSkeleton />
      <ProposedVehicleSkeleton />
    </div>
  );
};
