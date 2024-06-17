import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VEHICLE_QUERY } from './getVehicleDetail';
import { QualityCheckStatus } from '@/modules/content/types';

export const SAVE_QUALITY_CHECK_MUTATION = gql`
  mutation SaveQualityCheck($photoQualityCheck: PhotoQualityCheckInput!) {
    saveQualityCheck(photoQualityCheck: $photoQualityCheck)
  }
`;

export type PhotoQualityCheckInput = {
  comment?: string;
  isQualityGood: boolean;
  issues?: string[];
  status: QualityCheckStatus;
  vehicleId?: string;
  vehicleImageId: string;
};

export type SaveQualityCheckMutationRequest = {
  photoQualityCheck: PhotoQualityCheckInput;
};

export type SaveQualityCheckMutationResponse = boolean;

export const useSaveQualityCheckMutation = (
  options?: MutationHookOptions<
    SaveQualityCheckMutationResponse,
    SaveQualityCheckMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();
  return useMutation<
    SaveQualityCheckMutationResponse,
    SaveQualityCheckMutationRequest
  >(SAVE_QUALITY_CHECK_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.success<string>(t('notifications.infoSaveQualityCheck'));
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
