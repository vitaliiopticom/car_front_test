import { FC, useCallback, useMemo, useState } from 'react';

import { Avatar, Image, Link, Text } from '@/components/elements';
import {
  createTableColumns,
  DataView,
  DatePickerField,
  InputField,
  useDataViewContext,
} from '@/components/shared';
import { useCopyToClipboard } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { ChildCompaniesSelect } from '@/modules/companies';
import { createFullNameFromUser, UserTenantSelect } from '@/modules/users';
import { routes } from '@/router/routesList';
import { getStringWithSeparator, sum } from '@/utils/array';
import { formatDate } from '@/utils/date';
import { bytesToMb } from '@/utils/file';

import { VehicleCardType } from '../api/getVehicles';
import { BodyTypeSelect } from '../components/BodyTypeSelect';
import { FuelTypeSelect } from '../components/FuelTypeSelect';
import { ModelSelect } from '../components/ModelSelect';
import { ModelYearSelect } from '../components/ModelYearSelect';
import { VehicleDeleteConfirmModal } from '../components/VehicleDeleteConfirmModal';
import { FALLBACK_IMAGE } from '../constants';
import { Vehicle, VehicleDetails } from '../types';

import { GroupsSelect } from './GroupsSelect';
import { MakeSelect } from './MakeSelect';
import { SelectedVehiclesActionsPopup } from './SelectedVehiclesActionsPopup';
import { UsersSelect } from './UsersSelect';
import { VehicleActions } from './VehicleActions';
import { VehicleCard } from './VehicleCard';

type Props = {
  isLoading?: boolean;
};

const emptyRow = {
  string: ' - ',
  number: 0,
};

const getIsVehicleLinkDisabled = ({
  imageCounts,
  videosCount,
}: VehicleDetails) => imageCounts?.length === 0 && videosCount === 0;

export const VehicleList: FC<Props> = ({ isLoading = false }) => {
  const { t } = useTranslation();

  const { copy } = useCopyToClipboard();
  const handleShareLink = useCallback(
    (id: string) => {
      const url = window.location.origin + routes.contentDetail(id);
      copy(url);
    },
    [copy],
  );
  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );
  const canViewChildTenants = usePermissions(
    PERMISSIONS.OptiContent_View_ChildTenants,
  );
  const canDeleteAllVehicles = usePermissions(
    PERMISSIONS.OptiContent_Vehicles_Delete_All,
  );
  const [vehicleDetailData, setVehicleDetailData] = useState<Vehicle>();
  const { isSubmitting, setIsSubmitting } = useDataViewContext();

  const isMarketingManager = canDeleteAllVehicles || canViewChildTenants;
  const displayedCompanyName = canViewAllTenants || canViewChildTenants;

  const columns = useMemo(
    () =>
      createTableColumns<VehicleCardType>((ch) => [
        ch.accessor('detail.coverImage.image.thumbnailUri', {
          header: () => '',
          cell: ({ row }) => (
            <Link
              isDisabled={getIsVehicleLinkDisabled(row?.original?.detail)}
              to={routes.contentDetail(row.original.id)}
            >
              <Image
                alt=""
                className="h-9 overflow-hidden rounded-md"
                fallbackPath={FALLBACK_IMAGE}
                src={row.original.detail?.coverImage?.image?.thumbnailUri}
              />
            </Link>
          ),
        }),
        ch.accessor('vin', {
          header: () => t('common.title'),
          cell: ({ row }) => (
            <div className="flex h-full w-full flex-col">
              <Link
                className="text-sm font-medium"
                isDisabled={getIsVehicleLinkDisabled(row?.original?.detail)}
                to={routes.contentDetail(row.original.id)}
              >
                {row.original.vin || emptyRow.string}
              </Link>
              <Text size="xs">
                {getStringWithSeparator([
                  row.original?.make,
                  row.original?.modelYear,
                  row.original?.fuelType,
                ])}
              </Text>
            </div>
          ),
        }),
        ch.accessor('detail.imageCounts', {
          header: () => t('content.numOfFiles'),
          cell: ({ row }) => {
            const { processedImagesArchiveSize, detail } = row.original;
            const photosCount = sum(
              detail?.imageCounts,
              (item) => item.count,
              emptyRow.number,
            );
            const processedArchiveSize = bytesToMb(
              processedImagesArchiveSize,
            ).toUpperCase();
            const photosAvailable = photosCount > 0;
            const videosAvailable = detail?.videosCount > 0;

            const photosArchiveDetailsTranslation = `${t(
              'content.photosCount',
              { photosCount, count: photosCount },
            )} (${processedArchiveSize})`;
            const videosTranslation = t('content.videosCount', {
              videosCount: detail?.videosCount,
              count: detail?.videosCount,
            });

            if (!photosAvailable && !videosAvailable) {
              return '-';
            }

            return (
              <>
                {photosAvailable && (
                  <Text size="sm">{photosArchiveDetailsTranslation}</Text>
                )}
                {videosAvailable && <Text size="sm">{videosTranslation}</Text>}
              </>
            );
          },
        }),
        ch.accessor('createdAt', {
          header: () => t('common.date'),
          cell: ({ row }) => (
            <div className="text-sm font-medium">
              {row.original.createdAt
                ? formatDate(new Date(row.original.createdAt))
                : emptyRow.string}
            </div>
          ),
        }),
        ch.accessor('user', {
          header: () => t('common.createdBy'),
          cell: ({ row }) => {
            const { user, company } = row.original;
            const { firstname, lastname, photoUrl } = user;

            return (
              <div className="flex flex-row items-center gap-2">
                <Avatar
                  alt=""
                  imgUrl={photoUrl}
                  name={createFullNameFromUser(firstname, lastname)}
                  size="sm"
                />
                <div>
                  <Text className="text-secondary" size="sm">
                    {createFullNameFromUser(firstname, lastname)}
                  </Text>
                  {displayedCompanyName && (
                    <Text size="sm">{company?.companyName}</Text>
                  )}
                </div>
              </div>
            );
          },
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: ({ row }) => (
            <VehicleActions
              handleShareLink={handleShareLink}
              itemsDownloading={isSubmitting}
              row={row}
              setVehicleDetailData={setVehicleDetailData}
            />
          ),
        }),
      ]),
    [t, displayedCompanyName, handleShareLink, isSubmitting],
  );

  return (
    <div className="flex flex-col gap-5">
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
      <DataView.Table columns={columns} hasRowSelection />
      <DataView.Grid<VehicleCardType>>
        {({ recordsCount, data }) => (
          <>
            <div className="grid grid-cols-fill-18 gap-5 2xl:grid-cols-fill-18-r4">
              {recordsCount === 0
                ? t('components.table.recordsCount', { value: recordsCount })
                : data.map((item) => (
                    <VehicleCard
                      key={item.id}
                      displayCompanyName={displayedCompanyName}
                      isDisabled={getIsVehicleLinkDisabled(item?.detail)}
                      item={item}
                      photoQualityCheckStatus={item.photoQualityCheckStatus}
                      photoQualityCheckerUserId={item.photoQualityCheckerUserId}
                    />
                  ))}
            </div>
            <DataView.Pagination />
          </>
        )}
      </DataView.Grid>
      <SelectedVehiclesActionsPopup setItemsDownloading={setIsSubmitting} />
      <VehicleDeleteConfirmModal
        isOpen={!!vehicleDetailData}
        vehicle={vehicleDetailData}
        onClose={() => setVehicleDetailData(undefined)}
      />
    </div>
  );
};
