import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';

import { useVehiclesBodyTypeQuery } from '../api/getVehiclesBodyType';

type SelectOptions<A = string> = {
  id: A;
  name: string;
};

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  SelectOptions,
  Multi
>;

export const BodyTypeSelect = <Multi extends boolean>({
  ...rest
}: Props<Multi>) => {
  const { data, loading } = useVehiclesBodyTypeQuery({
    variables: {
      inputParameters: {
        tenantIds: [],
        userIds: [],
      },
    },
  });

  const mappedDataToOptions = data?.vehiclesBodyTypes
    ?.filter(Boolean)
    ?.map((item) => {
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
