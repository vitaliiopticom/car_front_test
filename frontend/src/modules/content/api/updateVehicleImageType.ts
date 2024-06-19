import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { VEHICLE_QUERY } from './getVehicleDetail';

// Define the mutation
export const UPDATE_VEHICLE_IMAGE_TYPE_MUTATION = gql`
  mutation UpdateVehicleImageType($imageTypeRequest: ImageTypeRequestInput!) {
    updateVehicleImageType(imageTypeRequest: $imageTypeRequest)
  }
`;

// Define the input type for the mutation
export type ImageTypeRequestInput = {
  vehicleId: string;
  vehicleImageId: string;
  type: string;
};

// Define the request and response types
export type UpdateVehicleImageTypeMutationRequest = {
  imageTypeRequest: ImageTypeRequestInput;
};

export type UpdateVehicleImageTypeMutationResponse = boolean;

/**
 * Hook to update the vehicle image type.
 *
 * This hook provides a mutation for updating the vehicle image type.
 * It also refetches the vehicle details query upon completion and shows a success toast notification.
 *
 * @param options - Optional mutation hook options.
 * @returns A mutation function to update the vehicle image type.
 */
export const useUpdateVehicleImageTypeMutation = (
  options?: MutationHookOptions<
    UpdateVehicleImageTypeMutationResponse,
    UpdateVehicleImageTypeMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();
  return useMutation<
    UpdateVehicleImageTypeMutationResponse,
    UpdateVehicleImageTypeMutationRequest
  >(UPDATE_VEHICLE_IMAGE_TYPE_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [VEHICLE_QUERY] });
      toast.success<string>(t('notifications.infoUpdateVehicleImageType'));
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
