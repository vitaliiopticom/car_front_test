import { gql, QueryHookOptions, useQuery } from '@/api';

import { CompanyGroup } from '../types';

export const COMPANY_GROUPS_QUERY = gql`
  query GetCompanyGroups {
    companies(filterParameters: { companyType: DEALER_GROUP }) {
      items {
        companyName
        tenantId
      }
    }
  }
`;

export type GetCompanyGroupsQueryRequest = {};

export type GetCompanyGroupsQueryResponse = {
  companies: { items: CompanyGroup[] };
};

export const useGetCompanyGroupsQuery = (
  options?: QueryHookOptions<
    GetCompanyGroupsQueryResponse,
    GetCompanyGroupsQueryRequest
  >,
) => {
  return useQuery<GetCompanyGroupsQueryResponse, GetCompanyGroupsQueryRequest>(
    COMPANY_GROUPS_QUERY,
    options,
  );
};
