import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/elements';
import {
  DataView,
  DataViewChangeHandler,
  LAYOUT_MODE,
  Page,
  PageMessage,
  QueryDataLoader,
} from '@/components/shared';
import { usePreviousNonNullish } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { PHOTOBOX_STATUS } from '@/modules/companies';
import { routes } from '@/router/routesList';
import { endOfTheDay, formatDateToAPI } from '@/utils/date';

import { useGetVehiclesQuery, VehicleCardType } from '@/common/api/getVehicles';
import { PaginationAndFilterSkeleton } from '@/common/components/PaginationAndFilterSkeleton';
import { QRCard } from '../components/QRCard';
import { VehicleCardSkeleton } from '../components/VehicleCardSkeleton';
import { VehicleList } from '../components/VehicleList';
import {
  OPTICONTENT_DATA_VIEW_ID,
  PAGE_MESSAGES_MISSING_OPTIPIX_ACCESS,
  PAGE_MESSAGES_NO_PHOTOS,
  PAGE_MESSAGES_PHOTO_BOX_CREATING,
  VEHICLES_FILTER_DEFAULT,
  VEHICLES_PAGINATION_DEFAULT,
} from '../constants';
import { FilterValues } from '../types';

const handleItemSelectionDisabled = ({
  processedImagesArchiveSize,
  processedImagesArchiveUri,
  detail: { imageCounts },
}: VehicleCardType) =>
  !imageCounts?.length ||
  !processedImagesArchiveSize ||
  !processedImagesArchiveUri;

export const ContentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hasOptiPixAccess = usePermissions(PERMISSIONS.OptiPix_AccessOptiPix);
  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );
  const canViewAllPhotos = usePermissions(
    PERMISSIONS.OptiContent_View_AllPhotos,
  );
  const filterUsed = useRef(false);

  const vehiclesQuery = useGetVehiclesQuery({
    variables: {
      inputParameters: {
        pagingParameters: VEHICLES_PAGINATION_DEFAULT,
        filterParameters: VEHICLES_FILTER_DEFAULT,
      },
    },
  });
  const prevData = usePreviousNonNullish(vehiclesQuery.data);
  const data = vehiclesQuery.data ?? prevData;

  const handlePaginationAndFilterChange: DataViewChangeHandler<
    FilterValues
  > = ({ pagination, filters }) => {
    filterUsed.current = true;
    const { page, pageSize } = pagination;
    const { dateFrom, dateTo, ...restFilters } = filters;

    vehiclesQuery.refetch({
      inputParameters: {
        pagingParameters: { pageIndex: page - 1, pageSize },
        filterParameters: {
          dateFrom: dateFrom ? formatDateToAPI(new Date(dateFrom)) : null,
          dateTo: dateTo
            ? formatDateToAPI(endOfTheDay(new Date(dateTo)))
            : null,
          ...restFilters,
        },
      },
    });
  };

  const isPhotoBoxReady =
    data?.vehicles?.photoBoxStatus === PHOTOBOX_STATUS.READY;
  const noPhotosInBox =
    data?.vehicles?.vehicles?.count === 0 && !filterUsed.current;
  const canViewStatistics =
    isPhotoBoxReady &&
    !noPhotosInBox &&
    (hasOptiPixAccess || canViewAllPhotos) &&
    !canViewAllTenants;

  return (
    <Page
      actions={
        canViewStatistics && (
          <Button
            variant="secondary"
            onClick={() => navigate(routes.contentStatistics())}
          >
            {t('content.navToStatistics')}
          </Button>
        )
      }
      title={t('common.content')}
    >
      <QueryDataLoader
        loader={
          <PaginationAndFilterSkeleton>
            <div className="grid grid-cols-fill-18 gap-5 2xl:grid-cols-fill-18-r4">
              {[...Array(VEHICLES_PAGINATION_DEFAULT.pageSize)].map(
                (_, index) => (
                  <VehicleCardSkeleton key={index} />
                ),
              )}
            </div>
          </PaginationAndFilterSkeleton>
        }
        query={vehiclesQuery}
        keepPreviousData
      >
        {({ data, isLoading, isRefetching }) => {
          if (!isPhotoBoxReady) {
            return (
              <PageMessage messages={PAGE_MESSAGES_PHOTO_BOX_CREATING}>
                <div className="mt-12 flex">
                  <Button className="mr-3.5" variant="secondary">
                    {t('content.howToUse')}
                  </Button>
                  <Button variant="secondary">
                    {t('content.contactSales')}
                  </Button>
                </div>
              </PageMessage>
            );
          }
          if (noPhotosInBox && !hasOptiPixAccess) {
            return (
              <PageMessage messages={PAGE_MESSAGES_MISSING_OPTIPIX_ACCESS} />
            );
          }
          if (noPhotosInBox) {
            return (
              <PageMessage messages={PAGE_MESSAGES_NO_PHOTOS}>
                <div className="mt-12 flex">
                  <QRCard
                    className="mr-10"
                    header={t('content.downloadAndroid')}
                    imgSrc="/images/google-play-qr-code.png"
                  />
                  <QRCard
                    header={t('content.downloadIphone')}
                    imgSrc="/images/apple-store-qr-code.png"
                  />
                </div>
              </PageMessage>
            );
          }

          const {
            vehicles: {
              vehicles: { count, items },
            },
          } = data;

          return (
            <DataView
              data={items}
              defaultLayoutMode={LAYOUT_MODE.grid}
              filterDefaultValues={VEHICLES_FILTER_DEFAULT}
              handleItemSelectionDisabled={handleItemSelectionDisabled}
              id={OPTICONTENT_DATA_VIEW_ID}
              isFetching={isRefetching}
              isLoading={isLoading}
              recordsCount={count}
              onChange={handlePaginationAndFilterChange}
            >
              <VehicleList isLoading={isLoading || isRefetching} />
            </DataView>
          );
        }}
      </QueryDataLoader>
    </Page>
  );
};
