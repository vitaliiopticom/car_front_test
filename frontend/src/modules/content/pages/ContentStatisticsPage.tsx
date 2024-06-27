import { FC } from 'react';

import { Heading, Skeleton } from '@/components/elements';
import { Page, QueryDataLoader } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { formatDateToAPI } from '@/utils/date';

import { useGetVehicleBasicStatisticsQuery } from '../api/getVehicleBasicStatistics';
import { useGetVehicleFullStatisticsQuery } from '../api/getVehicleFullStatistics';
import { PhotographersList } from '../components/PhotographersList';
import { StatisticsCardsList } from '../components/StatisticsCardsList';
import { StatisticsCardsListSkeleton } from '../components/StatisticsCardsListSkeleton';
import { StatisticsFilter } from '@/common/components/StatisticsFilter';
import { STATISTICS_DATE_RANGE_FILTER_DEFAULT } from '../constants';
import { StatisticsDateFilters } from '../types';

export const ContentStatisticsPage: FC = () => {
  const { t } = useTranslation();
  const canViewAllPhotos = usePermissions(
    PERMISSIONS.OptiContent_View_AllPhotos,
  );

  const basicStatisticsQuery = useGetVehicleBasicStatisticsQuery({
    variables: {
      inputParameters: {
        dateFrom: formatDateToAPI(
          STATISTICS_DATE_RANGE_FILTER_DEFAULT.dateFrom,
        ),
        dateTo: formatDateToAPI(STATISTICS_DATE_RANGE_FILTER_DEFAULT.dateTo),
      },
    },
    skip: canViewAllPhotos,
  });

  const fullStatisticsQuery = useGetVehicleFullStatisticsQuery({
    variables: {
      inputParameters: {
        dateFrom: formatDateToAPI(
          STATISTICS_DATE_RANGE_FILTER_DEFAULT.dateFrom,
        ),
        dateTo: formatDateToAPI(STATISTICS_DATE_RANGE_FILTER_DEFAULT.dateTo),
      },
    },
    skip: !canViewAllPhotos,
  });

  const onDateChange = (values: StatisticsDateFilters) => {
    const query = canViewAllPhotos ? fullStatisticsQuery : basicStatisticsQuery;

    query.refetch({
      inputParameters: {
        dateFrom: values?.dateFrom ? formatDateToAPI(values.dateFrom) : null,
        dateTo: values?.dateTo ? formatDateToAPI(values.dateTo) : null,
      },
    });
  };

  return (
    <Page title={t('content.statistics')} backButton>
      <StatisticsFilter
        defaultValues={STATISTICS_DATE_RANGE_FILTER_DEFAULT}
        isLoading={fullStatisticsQuery.loading || basicStatisticsQuery.loading}
        onSubmit={(value) => onDateChange(value)}
      />
      {!canViewAllPhotos ? (
        <QueryDataLoader
          loader={<StatisticsCardsListSkeleton />}
          query={basicStatisticsQuery}
          keepPreviousData
        >
          {({ data }) => (
            <StatisticsCardsList statistics={data?.vehicleStatistics} />
          )}
        </QueryDataLoader>
      ) : (
        <QueryDataLoader
          query={fullStatisticsQuery}
          keepPreviousData
          useCustomLoading
        >
          {({ data, isLoading, isRefetching }) => {
            const photographers = data?.photographersVehicleStatistics;
            const photographersCount = `${photographers?.length || 0} ${t(
              'content.photographers',
            )}`;

            return (
              <>
                {isLoading && (
                  <div className="flex flex-col gap-6">
                    <StatisticsCardsListSkeleton />
                    <Skeleton className="my-6 mb-9 h-8 w-48" />
                  </div>
                )}
                {!isLoading && (
                  <>
                    <StatisticsCardsList statistics={data?.vehicleStatistics} />
                    <Heading className="mb-9" variant="h3">
                      {photographersCount}
                    </Heading>
                  </>
                )}
                <PhotographersList
                  isLoading={isLoading}
                  isRefetching={isRefetching}
                  photographers={photographers || []}
                />
              </>
            );
          }}
        </QueryDataLoader>
      )}
    </Page>
  );
};
