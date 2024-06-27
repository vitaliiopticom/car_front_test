import { gql, MutationHookOptions, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Lead } from '../types/leadTypes';

export const UPDATE_LEAD_MUTATION = gql`
  mutation UpdateLead($input: UpdateLeadInput!) {
    updateLead(updateLeadRequest: $input)
  }
`;

export type UpdateLeadMutationRequest = {
  input: Lead;
};

export type UpdateLeadMutationResponse = {
  updateLead: any;
};

export const useUpdateLeadMutation = (
  options?: MutationHookOptions<
    UpdateLeadMutationResponse,
    UpdateLeadMutationRequest
  >,
) => {
  // const client = useApolloClient();
  const { t } = useTranslation();
  
  return useMutation<
    UpdateLeadMutationResponse,
    UpdateLeadMutationRequest
  >(UPDATE_LEAD_MUTATION, {
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
