import { FC, useCallback, useMemo, useState } from 'react';

import { Avatar, Image, Link, Text } from '@/components/elements';
import {
  createTableColumns,
  DataView,
  useDataViewContext,
} from '@/components/shared';
import { useCopyToClipboard } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { createFullNameFromUser } from '@/modules/users';
import { routes } from '@/router/routesList';
import { getStringWithSeparator, sum } from '@/utils/array';
import { formatDate } from '@/utils/date';
import { bytesToMb } from '@/utils/file';

import { VehicleFilterContentPage } from '@/common/components/filters'

import { VehicleCardType } from '@/common/api/getVehicles';
import { VehicleDeleteConfirmModal } from '../components/VehicleDeleteConfirmModal';
import { FALLBACK_IMAGE } from '../constants';
import { Vehicle, VehicleDetails } from '../types';

import { SelectedVehiclesActionsPopup } from './SelectedVehiclesActionsPopup';
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
  const [vehicleDetailData, setVehicleDetailData] = useState<Vehicle>();
  const { isSubmitting, setIsSubmitting } = useDataViewContext();

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
              (item: any) => item.count,
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
      <VehicleFilterContentPage isLoading={isLoading} />
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
