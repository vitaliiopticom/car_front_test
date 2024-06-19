import { Pageable } from '@/types/pagination';

import { FilterValues, Vehicle, VehicleDetails, Vehicles } from '../types';
import { QueryHookOptions, gql, useQuery } from '@/api';

export const QUALITY_CHECKER_VEHICLES_QUERY = gql`
  query GetQualityCheckerVehicles($inputParameters: GetVehiclesInput!) {
    qualityCheckerVehicles(inputParameters: $inputParameters) {
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
          photoQualityCheckStatus
          photoQualityCheckerUserId
        }
      }
      photoBoxStatus
    }
  }
`;

export type VehicleCardType = Vehicle & {
  detail: VehicleDetails;
};

export type GetQualityCheckerVehiclesQueryRequest = {
  inputParameters: {
    pagingParameters: { pageIndex: number; pageSize: number };
    filterParameters: FilterValues;
  };
};

export type GetQualityCheckerVehiclesQueryResponse = {
  qualityCheckerVehicles: Vehicles<Pageable<VehicleCardType>>;
};

export const useGetQualityCheckerVehiclesQuery = (
  options?: QueryHookOptions<
    GetQualityCheckerVehiclesQueryResponse,
    GetQualityCheckerVehiclesQueryRequest
  >,
) => {
  return useQuery(QUALITY_CHECKER_VEHICLES_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
