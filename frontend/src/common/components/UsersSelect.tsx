import { useCallback } from 'react';

import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { createFullNameFromUser, User } from '@/modules/users';

import { useGetVehiclesAllUsersQuery } from '../api/getVehiclesAllUsers';

type Props<Multi extends boolean> = {} & RequiredDataSelectFieldProps<
  User,
  Multi
>;

export const UsersSelect = <Multi extends boolean>({
  ...rest
}: Props<Multi>) => {
  const { data, loading } = useGetVehiclesAllUsersQuery();

  const mapDataToOption = useCallback(
    (item: User) => ({
      value: item.id,
      label: createFullNameFromUser(item.firstname, item.lastname),
    }),
    [],
  );

  return (
    <DataSelectField
      data={data?.vehiclesAllUsers || []}
      isLoading={loading}
      mapDataToOption={mapDataToOption}
      {...rest}
    />
  );
};
