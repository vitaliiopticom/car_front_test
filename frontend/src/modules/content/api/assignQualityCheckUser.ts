import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VEHICLE_QUERY } from './getVehicleDetail';

export const ASSIGN_QUALITY_CHECK_USER_MUTATION = gql`
  mutation AssignQualityCheckUser(
    $photoQualityCheckUser: AssignPhotoQualityCheckerInput!
  ) {
    assignQualityCheckUser(photoQualityCheckUser: $photoQualityCheckUser)
  }
`;

export type AssignPhotoQualityCheckerInput = {
  vehicleId: string;
  userId: string;
};

export type AssignQualityCheckUserMutationRequest = {
  photoQualityCheckUser: AssignPhotoQualityCheckerInput;
};

export type AssignQualityCheckUserMutationResponse = boolean;

/**
 * Hook to assign a quality check user to a vehicle.
 *
 * This hook provides a mutation for assigning a quality check user to a specific vehicle.
 * It also refetches the vehicle details query upon completion and shows a success toast notification.
 *
 * @param options - Optional mutation hook options.
 * @returns A mutation function to assign a quality check user.
 */
export const useAssignQualityCheckUserMutation = (
  options?: MutationHookOptions<
    AssignQualityCheckUserMutationResponse,
    AssignQualityCheckUserMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();
  return useMutation<
    AssignQualityCheckUserMutationResponse,
    AssignQualityCheckUserMutationRequest
  >(ASSIGN_QUALITY_CHECK_USER_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.success<string>(t('notifications.infoAssignQualityCheckUser'));
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
