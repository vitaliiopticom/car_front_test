import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Heading, IconName, Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { routes } from '@/router/routesList';
import { getStringWithSeparator, sum } from '@/utils/array';
import { cx } from '@/utils/classNames';
import { formatDate } from '@/utils/date';
import { bytesToMb } from '@/utils/file';

import { VehicleCardType } from '../api/getVehicles';
import { GeoLocationLink } from '../components/GeoLocationLink';
import { PhotoInfoChip } from '../components/PhotoInfoChip';
import { CONTENT_ITEM_TYPE, FALLBACK_IMAGE } from '../constants';
import { ImageCount, PhotoType, QualityCheckStatus } from '../types';

import { DownloadIconButton } from './DownloadIconButton';
import { IconQualityCheckStatus } from '@/modules/content/components/IconQualityCheck';

const getPhotoGroupCount = (images: ImageCount[], key: PhotoType): number => {
  const group = images.find((image) => image['photoType'] === key);

  return group ? group.count : 0;
};

const DEFAULT_STYLE = cx(
  'flex cursor-pointer flex-col relative group',
  'overflow-hidden rounded-lg border border-secondary-tint-90 hover:border-secondary-tint-70',
  'focus:border-primary focus:outline-0 focus:ring-0',
);

type Props = {
  item: VehicleCardType;
  isDisabled?: boolean;
  displayCompanyName?: boolean;
  photoQualityCheckStatus?: QualityCheckStatus;
  photoQualityCheckerUserId?: string;
};

export const VehicleCard: FC<Props> = ({
  item: {
    vin,
    company,
    createdAt,
    detail: {
      coverImage: {
        image: { thumbnailUri },
      },
      imageCounts,
      videosCount,
      vehicle: { id },
      geoLocation,
    },
    processedImagesArchiveUri,
    make,
    model,
    modelYear,
    processedImagesArchiveSize,
  },
  isDisabled = false,
  displayCompanyName,
  photoQualityCheckStatus,
  photoQualityCheckerUserId,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const contentCountGroup = [
    {
      contentType: CONTENT_ITEM_TYPE.EXTERIOR,
      count: getPhotoGroupCount(imageCounts, CONTENT_ITEM_TYPE.EXTERIOR),
      icon: 'carExterior',
    },
    {
      contentType: CONTENT_ITEM_TYPE.INTERIOR,
      count: getPhotoGroupCount(imageCounts, CONTENT_ITEM_TYPE.INTERIOR),
      icon: 'carInterior',
    },
    {
      contentType: CONTENT_ITEM_TYPE.DETAILS,
      count: getPhotoGroupCount(imageCounts, CONTENT_ITEM_TYPE.DETAILS),
      icon: 'carDetail',
    },
    {
      contentType: CONTENT_ITEM_TYPE.VIDEO,
      count: videosCount,
      icon: 'carVideo',
    },
  ];

  const contentItemsCount = sum(imageCounts, (item) => item.count);
  const numberOfFiles = `${contentItemsCount} ${t('common.files')}`;
  const archiveSize = `(${bytesToMb(
    processedImagesArchiveSize,
  ).toLowerCase()})`;
  const creationDate = formatDate(new Date(createdAt), 'dd MMM yyyy');

  const countAndSize = contentItemsCount && `${numberOfFiles} ${archiveSize}`;
  const vehicleDetails = getStringWithSeparator([
    make,
    model,
    modelYear ?? '',
    countAndSize || '',
    creationDate,
    displayCompanyName ? company?.companyName : '',
  ]);

  const onClickHandler = () => navigate(routes.contentDetail(id));

  const Details = (
    <div className="flex h-full flex-col justify-between gap-3 px-2 py-2">
      <div className="flex w-full justify-between" onClick={onClickHandler}>
        {contentCountGroup.map(({ icon, count }, index) => (
          <PhotoInfoChip
            key={index}
            iconName={icon as IconName}
            value={count}
          />
        ))}
      </div>
      <div onClick={onClickHandler}>
        <Heading as="h2" className="truncate" variant="h4">
          {vin}
        </Heading>
        <Text className="grow" size="sm" isSecondary>
          {vehicleDetails}
        </Text>
      </div>
      <div className="min-h-8 grid w-full grid-cols-4">
        <div className="col-span-1"></div>
        <div className="col-span-3 col-start-2 justify-self-end">
          <GeoLocationLink data={geoLocation} isDisabled={isDisabled} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={cx(DEFAULT_STYLE, isDisabled && 'pointer-events-none')}>
      <div className="relative flex w-full flex-col" onClick={onClickHandler}>
        <Image
          alt="alt"
          className="aspect-thumbnail"
          fallbackPath={FALLBACK_IMAGE}
          src={thumbnailUri || FALLBACK_IMAGE}
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-0 group-hover:opacity-40" />
        {contentItemsCount > 0 && (
          <>
            <DownloadIconButton
              className="absolute right-2 top-2 opacity-0 transition ease-in-out group-hover:opacity-100"
              downloadUri={processedImagesArchiveUri}
              tooltipContent={t('content.DownloadProcessedPhotos')}
              tooltipPlacement="left"
            />

            <div className="absolute left-2 top-2 rounded-md text-primary opacity-0 opacity-100 transition ease-in-out">
              <IconQualityCheckStatus
                status={photoQualityCheckStatus}
                userID={photoQualityCheckerUserId}
              />
            </div>
          </>
        )}
      </div>
      {Details}
    </div>
  );
};
