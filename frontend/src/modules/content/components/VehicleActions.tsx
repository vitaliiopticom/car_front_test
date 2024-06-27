import { Dispatch, FC, SetStateAction } from 'react';
import { Row } from '@tanstack/react-table';

import { ActionsMenu, IconButton } from '@/components/elements';
import { useDataViewContext, useGetIsItemSelected } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';

import { VehicleCardType } from '@/common/api/getVehicles';
import { Vehicle } from '../types';

import { DownloadIconButton } from './DownloadIconButton';

type Props = {
  handleShareLink: (id: string) => void;
  row: Row<VehicleCardType>;
  setVehicleDetailData: Dispatch<SetStateAction<Vehicle | undefined>>;
  itemsDownloading: boolean;
};

export const VehicleActions: FC<Props> = ({
  row,
  handleShareLink,
  setVehicleDetailData,
  itemsDownloading,
}) => {
  const { t } = useTranslation();
  const { id } = useDataViewContext();
  const canViewChildTenants = usePermissions(
    PERMISSIONS.OptiContent_View_ChildTenants,
  );
  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );
  const isItemSelected = useGetIsItemSelected(
    id,
    row.original,
    (item) => item.id,
  );

  const downloadUri = row.original.processedImagesArchiveUri;
  const isDownloading = isItemSelected && itemsDownloading;
  const vehicleDetail = row.original?.detail;
  const noPhotos = !vehicleDetail?.imageCounts.length;

  return (
    <div className="flex items-center gap-2">
      <DownloadIconButton
        disabled={noPhotos}
        downloadUri={downloadUri}
        isLoading={isDownloading}
        tooltipContent={t('content.DownloadProcessedPhotos')}
      />
      <IconButton
        disabled={noPhotos && !vehicleDetail?.videosCount}
        name="share"
        size="sm"
        variant="secondary"
        onClick={() => handleShareLink(row.original.id)}
      />
      <ActionsMenu
        items={[
          {
            label: t('content.deleteVehicle'),
            onClick: () => {
              setVehicleDetailData(row.original.detail?.vehicle);
            },
            isShown: !canViewChildTenants && !canViewAllTenants,
          },
        ]}
      />
    </div>
  );
};
