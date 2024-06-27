import { gql, QueryHookOptions, useQuery } from '@/api';

import { LeadResponse, LeadStateEnum } from '../types/leadTypes';

export const LEADS_QUERY = gql`
  query GetLeads($inputParameters: GetLeadsInput!) {
    leads(
      getLeadsRequest: $inputParameters
    ) {
      id
      agentId
      tenantId
      platform
      clientInfo {
        title
        firstName
        lastName
        language
        emails
        telephones
        mobiles
      }
      emailInfo {
        emailSubject
      }
      createdAt
    }
  }
`;

export type GetLeadsQueryRequest = {
  inputParameters: {
    pagingParameters: {
      pageIndex: number;
      pageSize: number
    },
    filterParameters: {
      firstResponse: boolean;
      leadState: LeadStateEnum | null;
    }
  }
};

export type GetLeadsQueryResponse = {
  leads: LeadResponse[];
};

export const useGetLeadsQuery = (
  options?: QueryHookOptions<GetLeadsQueryResponse, GetLeadsQueryRequest>,
) => {
  return useQuery<GetLeadsQueryResponse, GetLeadsQueryRequest>(LEADS_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
