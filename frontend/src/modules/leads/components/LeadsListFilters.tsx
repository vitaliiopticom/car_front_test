import { FC } from 'react';

import { DataView, InputField } from '@/components/shared';
import { useTranslation } from '@/i18n';

export const LeadsListFilters: FC = () => {
  const { t } = useTranslation();

  return (
    <DataView.FilterGroup>
      <InputField
        endIcon="search"
        name="search"
        placeholder={t('common.lastName')}
      />
      <InputField
        endIcon="search"
        name="email"
        placeholder={t('common.email')}
      />
      <InputField
        endIcon="search"
        name="language"
        placeholder={t('common.language')}
      />
    </DataView.FilterGroup>
  );
};
