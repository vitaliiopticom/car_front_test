import { useEffect } from 'react';

import {
  DataSelectField,
  RequiredDataSelectFieldProps,
  useFormContext,
  useWatch,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useVehiclesModelYearQuery } from '../api/getVehiclesModelYear';
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

export const ModelYearSelect = <Multi extends boolean>({
  disabled,
  ...rest
}: Props<Multi>) => {
  const makesSelect = useWatch({ name: 'makes' });
  const modelSelect = useWatch({ name: 'models' });
  const { setValue, formState, getFieldState } = useFormContext<FilterValues>();
  const { t } = useTranslation();

  useEffect(() => {
    const { isDirty } = getFieldState('models', formState);
    if (modelSelect === null || isDirty) {
      setValue('modelYears', null);
    }
  }, [modelSelect, makesSelect, setValue]);

  const { data, loading } = useVehiclesModelYearQuery({
    variables: {
      inputParameters: {
        make: makesSelect,
        model: modelSelect,
        tenantIds: [],
        userIds: [],
      },
    },
  });

  const mappedDataToOptions = data?.vehiclesModelYears?.map((item) => {
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
      disabled={disabled || !modelSelect}
    />
  );
};
