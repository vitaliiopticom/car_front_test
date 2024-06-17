import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  ActionMenuItemProps,
  ActionsMenu,
  IconButton,
  Text,
  Tooltip,
} from '@/components/elements';
import { NotFound, Page, QueryDataLoader } from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { getStringWithSeparator } from '@/utils/array';
import { formatDateTime } from '@/utils/date';

import { useGetVehicleByIdQuery } from '../api/getVehicleDetail';
import { ChangeVinNumberModal } from '../components/ChangeVinNumberModal';
import { VehicleDeleteConfirmModal } from '../components/VehicleDeleteConfirmModal';
import { VehicleDetailContentManager } from '../components/VehicleDetailContentManager';
import {
  VEHICLE_DETAILS_SKELETON_TYPE,
  VehicleDetailSkeletons,
} from '../components/VehicleDetailSkeletons';
import { VehicleDetailParams } from '../types';

export const ContentDetailPage: FC = () => {
  const { t } = useTranslation();
  const { id = '' } = useParams<VehicleDetailParams>();
  const changeVinNumberModal = useDisclosure();
  const vehicleDeleteConfirmModal = useDisclosure();
  const canViewChildTenants = usePermissions(
    PERMISSIONS.OptiContent_View_ChildTenants,
  );
  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );

  const getVehicleByIdQuery = useGetVehicleByIdQuery({
    variables: { vehicleId: id },
  });

  const actionMenuItems: ActionMenuItemProps[] = [
    {
      label: t('content.deleteVehicle'),
      onClick: vehicleDeleteConfirmModal.onOpen,
      isShown: !canViewChildTenants && !canViewAllTenants,
    },
    // { label: t('content.changeVINNum'), onClick: changeVinNumberModal.onOpen },
  ];

  if (getVehicleByIdQuery.error) {
    return <NotFound />;
  }

  const vehicleDetailData = getVehicleByIdQuery.data?.vehicleDetail.vehicle;
  const { make, model, modelYear, fuelType, bodyType } =
    vehicleDetailData || {};
  const isVinDecoded =
    !!make || !!model || !!modelYear || !!fuelType || !!bodyType;

  return (
    <Page
      actions={
        <ActionsMenu
          items={actionMenuItems}
          placement="left"
          wrapperClassName="mr-8"
        />
      }
      headerContent={
        vehicleDetailData ? (
          <div className="flex flex-wrap items-center gap-x-6 pl-7">
            {isVinDecoded ? (
              <Text size="sm">
                {getStringWithSeparator([
                  make,
                  model,
                  modelYear,
                  bodyType,
                  fuelType,
                ])}
              </Text>
            ) : (
              <Tooltip content={t('content.vinNotDecoded')}>
                <IconButton
                  className="h-5.5 w-5.5 rounded-full p-px"
                  name={'exclamation'}
                  size="sm"
                />
              </Tooltip>
            )}
            <Text size="sm">
              {formatDateTime(new Date(vehicleDetailData.createdAt))}
            </Text>
          </div>
        ) : (
          <VehicleDetailSkeletons type={VEHICLE_DETAILS_SKELETON_TYPE.HEADER} />
        )
      }
      title={vehicleDetailData?.vin}
      backButton
    >
      <QueryDataLoader
        loader={<VehicleDetailSkeletons />}
        query={getVehicleByIdQuery}
      >
        {({ data: { vehicleDetail } }) => (
          <VehicleDetailContentManager
            vehicleDetail={vehicleDetail}
            vehicleId={id}
          />
        )}
      </QueryDataLoader>
      {vehicleDetailData && (
        <>
          <ChangeVinNumberModal
            isOpen={changeVinNumberModal.isOpen}
            vehicle={vehicleDetailData}
            onClose={changeVinNumberModal.onClose}
          />
          <VehicleDeleteConfirmModal
            isOpen={vehicleDeleteConfirmModal.isOpen}
            vehicle={vehicleDetailData}
            onClose={vehicleDeleteConfirmModal.onClose}
          />
        </>
      )}
    </Page>
  );
};
