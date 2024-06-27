import { gql, QueryHookOptions, useQuery } from '@/api';

import { LeadVehicles } from '../types/leadTypes';

export const LEAD_VEHICLES_QUERY = gql`
query leadVehiclesById($leadId: UUID!) {
    leadVehiclesById(leadId: $leadId) {
        leadVehicles {
          id
          leadId
          referenceForAd
          vehicleId
          vIN
        }
    }
  }
`;

export type GetLeadVehiclesQueryRequest = {
  leadId: string;
};

export type GetLeadVehiclesQueryResponse = {
  leadVehiclesById: {
    leadVehicles: LeadVehicles[];
  }
};

export const useGetLeadVehiclesQuery = (
  options?: QueryHookOptions<GetLeadVehiclesQueryResponse, GetLeadVehiclesQueryRequest>,
) => {
  return useQuery<GetLeadVehiclesQueryResponse, GetLeadVehiclesQueryRequest>(LEAD_VEHICLES_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
