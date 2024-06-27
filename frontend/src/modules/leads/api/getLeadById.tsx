import { gql, QueryHookOptions, useQuery } from '@/api';

import { LeadResponse } from '../types/leadTypes';

export const LEAD_QUERY = gql`
  query getLeadById($id: UUID!) {
    leadById(getLeadById: { id: $id }) {
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
      firstResponse
      leadSource
      leadState
      rating
      businessState
      createdBy
    }
  }
`;

export type GetLeadByIdQueryRequest = {
  id: string;
};

export type GetLeadByIdQueryResponse = {
  leadById: LeadResponse;
};

export const useGetLeadByIdQuery = (
  options?: QueryHookOptions<GetLeadByIdQueryResponse, GetLeadByIdQueryRequest>,
) => {
  return useQuery<GetLeadByIdQueryResponse, GetLeadByIdQueryRequest>(
    LEAD_QUERY,
    { fetchPolicy: 'no-cache', ...options },
  );
};
