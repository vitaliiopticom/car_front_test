import { gql, QueryHookOptions, useQuery } from '@/api';
import { Pageable } from '@/types/pagination';

import { FilterValues, Vehicle, Vehicles } from '../types';

import { VehicleDetails } from '@/modules/content/types'

export const VEHICLES_QUERY = gql`
  query GetVehicles($inputParameters: GetVehiclesInput!) {
    vehicles(inputParameters: $inputParameters) {
      vehicles {
        count
        items {
          id
          user {
            lastname
            firstname
            email
          }
          company {
            companyName
          }
          createdAt
          vin
          detail {
            imageCounts {
              photoType
              count
            }
            videosCount
            vehicle {
              id
            }
            coverImage {
              image {
                uri
                thumbnailUri
              }
            }
            geoLocation {
              latitude
              longitude
              address
            }
          }
          processedImagesArchiveUri
          processedImagesArchiveSize
          make
          model
          modelYear
          fuelType
          bodyType
        }
      }
      photoBoxStatus
    }
  }
`;

export type VehicleCardType = Vehicle & {
  detail: VehicleDetails;
};

export type GetVehiclesQueryRequest = {
  inputParameters: {
    pagingParameters: { pageIndex: number; pageSize: number };
    filterParameters: FilterValues;
  };
};

export type GetVehiclesQueryResponse = {
  vehicles: Vehicles<Pageable<VehicleCardType>>;
};

export const useGetVehiclesQuery = (
  options?: QueryHookOptions<GetVehiclesQueryResponse, GetVehiclesQueryRequest>,
) => {
  return useQuery<GetVehiclesQueryResponse, GetVehiclesQueryRequest>(VEHICLES_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
