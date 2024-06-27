import { useEffect } from 'react';

import {
  DataSelectField,
  RequiredDataSelectFieldProps,
  useFormContext,
  useWatch,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useVehiclesModelQuery } from '../api/getVehiclesModels';
import { UNKNOWN_OPTION } from '../constants';
import { FilterValues } from '../types';

type SelectOptions<A = string> = {
  id: A;
  name: string;
};

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  SelectOptions,
  Multi
>;

export const ModelSelect = <Multi extends boolean>({
  disabled,
  ...rest
}: Props<Multi>) => {
  const makeSelect = useWatch({ name: 'makes' });
  const { setValue, formState, getFieldState } = useFormContext<FilterValues>();
  const { t } = useTranslation();

  useEffect(() => {
    const { isDirty } = getFieldState('makes', formState);
    if (makeSelect === null || isDirty) {
      setValue('models', null);
    }
  }, [makeSelect, setValue]);

  const { data, loading } = useVehiclesModelQuery({
    variables: {
      inputParameters: {
        make: makeSelect,
        tenantIds: [],
        userIds: [],
      },
    },
  });

  const mappedDataToOptions = data?.vehiclesModels?.map((item) => {
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
      disabled={disabled || !makeSelect}
    />
  );
};
