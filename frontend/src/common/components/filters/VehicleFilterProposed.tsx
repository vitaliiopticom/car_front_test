import { FC } from 'react';

import {
  DataView,
  InputField,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { BodyTypeSelect } from '../BodyTypeSelect';
import { FuelTypeSelect } from '../FuelTypeSelect';
import { ModelSelect } from '../ModelSelect';
import { ModelYearSelect } from '../ModelYearSelect';

import { MakeSelect } from '../MakeSelect';

type Props = {
  isLoading?: boolean;
};


export const VehicleFilterProposed: FC<Props> = ({ isLoading = false }) => {
  const { t } = useTranslation();


  return (
    <>
        <div className="grid justify-items-end">
          <DataView.FiltersToggle />
        </div>
      <DataView.Filters className="mb-0" hasToggle>
        <div className="flex gap-8">
          <InputField
            disabled={isLoading}
            endIcon="search"
            name="vIN"
            placeholder={t('content.filter.byVin')}
            className='w-4/12'
            label="VIN"
          />

          <MakeSelect
            disabled={isLoading}
            name="makes"
            placeholder={t('content.filter.makes')}
            className='w-4/12'
            label="Make"
          />
          <ModelSelect
            disabled={isLoading}
            name="models"
            placeholder={t('content.filter.model')}
            className='w-4/12'
            label="Model"
          />
        </div>
        <div className="flex gap-8">


          <ModelYearSelect
            disabled={isLoading}
            name="modelYears"
            placeholder={t('content.filter.modelYear')}
            className='w-4/12'
            label="Model"
          />
          <BodyTypeSelect
            disabled={isLoading}
            name="bodyTypes"
            placeholder={t('content.filter.bodyType')}
            className='w-4/12'
            label="Body type"
          />
          <FuelTypeSelect
            disabled={isLoading}
            name="fuelTypes"
            placeholder={t('content.filter.fuelType')}
            className='w-4/12'
            label="Fuel type"
          />
        </div>
      </DataView.Filters>
    </>
  );
};
