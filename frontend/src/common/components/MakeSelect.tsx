import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useVehiclesMakesQuery } from '../api/getVehiclesMakes';
import { UNKNOWN_OPTION } from '../constants';

type SelectOptions<A = string> = {
  id: A;
  name: string;
};

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  SelectOptions,
  Multi
>;

export const MakeSelect = <Multi extends boolean>({
  ...rest
}: Props<Multi>) => {
  const { t } = useTranslation();

  const { data, loading } = useVehiclesMakesQuery({
    variables: {
      inputParameters: {
        tenantIds: [],
        userIds: [],
      },
    },
  });

  const mappedDataToOptions = data?.vehiclesMakes?.map((item) => {
    return {
      id: item === null ? UNKNOWN_OPTION : item,
      name: item === null ? t('content.filter.missingDataOption') : item,
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
