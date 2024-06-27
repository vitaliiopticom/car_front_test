import { FC, useEffect } from 'react';

import { DatePickerField, Form, useForm } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { StatisticsDateFilters } from '../types';

type Props = {
  defaultValues: StatisticsDateFilters;
  isLoading: boolean;
  onSubmit: (value: StatisticsDateFilters) => void;
};

export const StatisticsFilter: FC<Props> = ({
  defaultValues,
  isLoading,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const methods = useForm<StatisticsDateFilters>({
    defaultValues: { ...defaultValues },
  });

  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((fields) => {
      onSubmit(fields);
    });

    return () => subscription.unsubscribe();
  }, [watch, onSubmit]);

  return (
    <Form
      className="flex flex-row justify-end gap-4 pb-6"
      formMethods={methods}
      onSubmit={() => {}}
    >
      <span className="inline-flex items-center text-xs">
        {t('content.selectedPeriod')}
      </span>
      <DatePickerField isDisabled={isLoading} name="dateFrom" size="sm" />
      <DatePickerField
        isDisabled={isLoading}
        name="dateTo"
        size="sm"
        setEndOfDay
      />
    </Form>
  );
};
