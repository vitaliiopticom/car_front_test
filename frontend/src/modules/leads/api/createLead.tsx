import { gql, MutationHookOptions, useApolloClient, useMutation } from '@/api';
import { toast } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Lead } from '../types/leadTypes';

import { LEADS_QUERY } from './getLeads';

export const CREATE_LEAD_MUTATION = gql`
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(createLead: $input) {
      id
    }
  }
`;

export type CreateLeadMutationRequest = {
  input: Omit<Lead, 'id' | 'clientInfo' | 'emailInfo' >;
};

export type CreateLeadMutationResponse = {
  createLead: number;
};

export const useCreateLeadMutation = (
  options?: MutationHookOptions<
    CreateLeadMutationResponse,
    CreateLeadMutationRequest
  >,
) => {
  const client = useApolloClient();
  const { t } = useTranslation();

  return useMutation<CreateLeadMutationResponse, CreateLeadMutationRequest>(
    CREATE_LEAD_MUTATION,
    {
      ...options,
      onCompleted: (data, clientOptions) => {
        client.refetchQueries({ include: [LEADS_QUERY] });
        toast.success<string>(
          t('notifications.successCreate', { name: 'Lead' }),
        );
        options?.onCompleted?.(data, clientOptions);
      },
    },
  );
};
