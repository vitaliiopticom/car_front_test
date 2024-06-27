import { FC, useState } from 'react';

import { InputField, SelectField, useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { ProductFormValuesBase } from '../types';

type Props = {
  tenantId?: string;
  withTenantRoles?: boolean;
  isAddUser?: boolean;
};

export const productFormDefaultValues: Partial<ProductFormValuesBase> = {
  clone: false,
  status: undefined,
  vin: '',
  brand: '',
  model: '',
  finition: '',
  color: '',
  km: '',
  ref: '',
  price: '',
  dateAvailable: '',
  localization: '',
  dateMatriculation: '',
  images: 0,
};

export const CREATE_PRODUCT_FORM_ID = 'createProductForm';

export const ProductFormFields: FC<Props> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label={t('config.finition')}
          name="finition"
          placeholder={t('config.finition')}
        />
        <SelectField
          label={t('config.brand')}
          name="brand"
          placeholder={t('config.brand')}
          options={[
            { label: 'Brand 1', value: 'brand1' },
            { label: 'Brand 2', value: 'brand2' },
            { label: 'Brand 3', value: 'brand3' },
          ]}
        />
        <InputField
          label={t('config.vin')}
          name="vin"
          placeholder={t('config.vin')}
        />
        <InputField
          label={t('config.ref')}
          name="ref"
          placeholder={t('config.ref')}
        />
        <SelectField
          label={t('config.model')}
          name="model"
          placeholder={t('config.model')}
          options={[
            { label: 'Model 1', value: 'model1' },
            { label: 'Model 2', value: 'model2' },
          ]}
        />

        <SelectField
          label={t('config.gearbox')}
          name="gearbox"
          placeholder={t('config.gearbox')}
          options={[
            { label: 'Automatic', value: 'automatic' },
            { label: 'Manual', value: 'manual' },
          ]}
        />
        <SelectField
          label={t('config.numberOfGears')}
          name="numberOfGears"
          placeholder={t('config.numberOfGears')}
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
          ]}
        />
        <InputField
          label={t('config.submodel')}
          name="submodel"
          placeholder={t('config.submodel')}
        />
        <InputField
          label={t('config.priceNew')}
          name="priceNew"
          placeholder={t('config.priceNew')}
        />
        <InputField
          label={t('config.internalColor')}
          name="internalColor"
          placeholder={t('config.internalColor')}
        />
        <InputField
          label={t('config.externalColor')}
          name="externalColor"
          placeholder={t('config.externalColor')}
        />
        <InputField
          label={t('config.numMatriculation')}
          name="numMatriculation"
          placeholder={t('config.numMatriculation')}
        />

        <InputField
          label={t('config.km')}
          name="km"
          placeholder={t('config.km')}
        />
      </div>
    </div>
  );
};
