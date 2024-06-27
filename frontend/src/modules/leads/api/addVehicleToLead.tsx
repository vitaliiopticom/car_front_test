import { gql, MutationHookOptions, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

export const ADD_VEHICLES_TO_LEAD_MUTATION = gql`
  mutation AddVehicleToLead($input: AddVehiclesInput!) {
    addVehiclesToLead(addVehicles: $input)
  }
`;

export type AddVehiclesToLeadMutationRequest = {
  input: {
    leadId: string;
    vehicles: {
      referenceForAd: string;
      vehicleId: string;
      vIN: string;
    }[]
  }
};

export type AddVehiclesToLeadMutationResponse = {
  addVehicles: any;
};

export const useAddVehiclesToLeadMutation = (
  options?: MutationHookOptions<
    AddVehiclesToLeadMutationResponse,
    AddVehiclesToLeadMutationRequest
  >,
) => {
  // const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<
    AddVehiclesToLeadMutationResponse,
    AddVehiclesToLeadMutationRequest
  >(ADD_VEHICLES_TO_LEAD_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      // client.refetchQueries({ include: [LEADS_QUERY] });
      toast.success<string>(
        t('notifications.successUpdate', { name: 'Lead' }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  });
};
