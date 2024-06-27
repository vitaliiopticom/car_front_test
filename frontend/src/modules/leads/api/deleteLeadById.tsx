import { gql, MutationHookOptions, useMutation, useApolloClient } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { LEADS_QUERY } from './getLeads';

export const DELETE_LEAD_MUTATION = gql`
  mutation DeleteLead($leadId: UUID!) {
    deleteLead(leadId: $leadId) {
      id
    }
  }
`;

export type DeleteLeadMutationRequest = {
    leadId: string;
};

export type DeleteLeadMutationResponse = {
  id: string;
};

export const useDeleteLeadMutation = (
  options?: MutationHookOptions<
    DeleteLeadMutationResponse,
    DeleteLeadMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();
  return useMutation<
    DeleteLeadMutationResponse,
    DeleteLeadMutationRequest
  >(DELETE_LEAD_MUTATION, {
    ...options,
    onCompleted: (data, clientOptions) => {
      client.refetchQueries({ include: [LEADS_QUERY] });
      toast.success<string>(
        t('notifications.successDelete', { name: 'Lead' }),
      );
      options?.onCompleted?.(data, clientOptions);
    },
  },);
};
