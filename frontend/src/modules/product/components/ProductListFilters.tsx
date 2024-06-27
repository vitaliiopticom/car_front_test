import { FC } from 'react';

import { DataView, InputField } from '@/components/shared';
import { useTranslation } from '@/i18n';

/**
 * Renders the component for filtering the product list.
 */
export const ProductListFilters: FC = () => {
  const { t } = useTranslation();

  return (
    <DataView.FilterGroup>
      <InputField
        endIcon="search"
        name="search"
        placeholder={t('common.vin')}
      />
      <InputField
        endIcon="search"
        name="status"
        placeholder={t('common.status')}
      />
      <InputField
        endIcon="search"
        name="brand"
        placeholder={t('common.brand')}
      />
      <InputField
        endIcon="search"
        name="model"
        placeholder={t('common.model')}
      />
      <InputField
        endIcon="search"
        name="finition"
        placeholder={t('common.finition')}
      />
      <InputField
        endIcon="search"
        name="color"
        placeholder={t('common.color')}
      />
      <InputField endIcon="search" name="km" placeholder={t('common.km')} />
      <InputField endIcon="search" name="ref" placeholder={t('common.ref')} />
      <InputField
        endIcon="search"
        name="price"
        placeholder={t('common.price')}
      />
      <InputField
        endIcon="search"
        name="dateAvailable"
        placeholder={t('common.dateAvailable')}
      />
      <InputField
        endIcon="search"
        name="localization"
        placeholder={t('common.localization')}
      />
      <InputField
        endIcon="search"
        name="dateMatriculation"
        placeholder={t('common.dateMatriculation')}
      />
      <InputField
        endIcon="search"
        name="images"
        placeholder={t('common.images')}
      />
    </DataView.FilterGroup>
  );
};
