import { FC } from 'react';

import {
  DataView,
  DatePickerField,
  InputField,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { ChildCompaniesSelect } from '@/modules/companies';
import { UserTenantSelect } from '@/modules/users';
import { BodyTypeSelect } from '../BodyTypeSelect';
import { FuelTypeSelect } from '../FuelTypeSelect';
import { ModelSelect } from '../ModelSelect';
import { ModelYearSelect } from '../ModelYearSelect';

import { GroupsSelect } from '../GroupsSelect';
import { MakeSelect } from '../MakeSelect';
import { UsersSelect } from '../UsersSelect';

type Props = {
  isLoading?: boolean;
};


export const VehicleFilterContentPage: FC<Props> = ({ isLoading = false }) => {
  const { t } = useTranslation();

  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );
  const canViewChildTenants = usePermissions(
    PERMISSIONS.OptiContent_View_ChildTenants,
  );
  const canDeleteAllVehicles = usePermissions(
    PERMISSIONS.OptiContent_Vehicles_Delete_All,
  );

  const isMarketingManager = canDeleteAllVehicles || canViewChildTenants;


  return (
    <>
      <div className="flex flex-row justify-between">
        <DataView.RecordsCount />
        <div className="flex gap-5">
          <DataView.FiltersToggle />
          <DataView.Toggle />
        </div>
      </div>
      <DataView.Filters className="mb-0" hasToggle>
        <DataView.FilterGroup title={t('content.filterGroupTitleGeneral')}>
          <DatePickerField
            isDisabled={isLoading}
            label={t('content.filter.startDate')}
            name="dateFrom"
          />
          <DatePickerField
            isDisabled={isLoading}
            label={t('content.filter.endDate')}
            name="dateTo"
            setEndOfDay
          />
          <InputField
            disabled={isLoading}
            endIcon="search"
            name="vIN"
            placeholder={t('content.filter.byVin')}
          />
          {canViewChildTenants && (
            <ChildCompaniesSelect
              disabled={isLoading}
              name="tenantIds"
              placeholder={t('content.filter.ChildCompanies')}
              isMultiple
            />
          )}
          {canViewAllTenants && (
            <>
              <GroupsSelect
                disabled={isLoading}
                name="parentTenantIds"
                placeholder={t('companies.parentEntity')}
                isMultiple
              />
              <UserTenantSelect
                disabled={isLoading}
                name="tenantIds"
                placeholder={t('common.company')}
                isMultiple
              />
            </>
          )}
          {(canViewAllTenants || isMarketingManager) && (
            <UsersSelect
              disabled={isLoading}
              name="userIds"
              placeholder={t('content.filter.byUsersName')}
              isMultiple
            />
          )}
        </DataView.FilterGroup>
        <DataView.FilterGroup title={t('content.filterGroupTitleCarRelated')}>
          <MakeSelect
            disabled={isLoading}
            name="makes"
            placeholder={t('content.filter.makes')}
          />
          <ModelSelect
            disabled={isLoading}
            name="models"
            placeholder={t('content.filter.model')}
          />
          <ModelYearSelect
            disabled={isLoading}
            name="modelYears"
            placeholder={t('content.filter.modelYear')}
          />
          <BodyTypeSelect
            disabled={isLoading}
            name="bodyTypes"
            placeholder={t('content.filter.bodyType')}
          />
          <FuelTypeSelect
            disabled={isLoading}
            name="fuelTypes"
            placeholder={t('content.filter.fuelType')}
          />
        </DataView.FilterGroup>
      </DataView.Filters>
    </>
  );
};
