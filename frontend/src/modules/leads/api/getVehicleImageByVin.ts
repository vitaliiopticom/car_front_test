import { gql, QueryHookOptions, useQuery } from '@/api';

export const VEHICLES_QUERY = gql`
  query GetVehicles($inputParameters: GetVehiclesInput!) {
    vehicles(inputParameters: $inputParameters) {
      vehicles {
        items {
          id
          vin
          detail {
            coverImage {
              image {
                thumbnailUri
              }
            }
          }
        }
      }
    }
  }
`;

export type GetVehiclesQueryRequest = {
  inputParameters: {
    filterParameters: {
      tenantIds?: string[];
      userIds?: string[];
      vIN?: string;
      dateFrom?: string;
      dateTo?: string;
      makes?: string[];
      models?: string[];
      modelYears?: number[];
      bodyTypes?: string[];
      fuelTypes?: string[];
    };
    pagingParameters: {
      pageIndex: number;
      pageSize: number;
    };
  };
};

export type GetVehiclesQueryResponse = {
  vehicles: {
    vehicles: {
      count: number;
      items: any[];
    }
  };
  photoBoxStatus: string;
};

export const useGetVehiclesQuery = (
  options?: QueryHookOptions<GetVehiclesQueryResponse, GetVehiclesQueryRequest>,
) => {
  return useQuery<GetVehiclesQueryResponse, GetVehiclesQueryRequest>(
    VEHICLES_QUERY,
    {
      ...options,
      notifyOnNetworkStatusChange: true,
    },
  );
};
