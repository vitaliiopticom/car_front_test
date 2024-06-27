import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';

import { useVehiclesFuelTypeQuery } from '../api/getVehiclesFuelType';

type SelectOptions<A = string> = {
  id: A;
  name: string;
};

type Props<Multi extends boolean> = {} & RequiredDataSelectFieldProps<
  SelectOptions,
  Multi
>;

export const FuelTypeSelect = <Multi extends boolean>({
  ...rest
}: Props<Multi>) => {
  const { data, loading } = useVehiclesFuelTypeQuery({
    variables: {
      inputParameters: {
        tenantIds: [],
        userIds: [],
      },
    },
  });
  const mappedDataToOptions = data?.vehiclesFuelTypes
    ?.filter(Boolean)
    .map((item) => {
      return {
        id: item,
        name: item,
      };
    });

  return (
    <DataSelectField
      data={mappedDataToOptions || []}
      isLoading={loading}
      {...rest}
    />
  );
};
