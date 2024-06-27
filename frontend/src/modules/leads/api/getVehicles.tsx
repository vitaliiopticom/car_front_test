import { gql, QueryHookOptions, useQuery } from '@/api';
import { VehicleDetails } from '../types/vehicleTypes';

export const VEHICLES_QUERY = gql`
  query GetVehicles($inputParameters: OptiConfigFilterParametersInput!) {
    vehiclesByFilter(vehicleFilter: $inputParameters) {
        id
        name
        model
        make
        fullName
        country
        created
        published
        stock
        structure
        imageCount
        fuel
        companyName
        constructionYear
        price {
            offerPrice
            purchasingPrice
            grossPrice
            netPrice
        }
        unitDetails {
            kilometers
            vIN
            exteriorColor
            colorName
            available
            availableFromDate
            localization
            referenceForAd
        }
        extraFieldsPlatform {
            mainImage {
                order
                path
                isLastPhoto
                isDeleted
            }
        }
        firstImageDAT {
            order
            path
            isLastPhoto
            isDeleted
        }
    }
  }
`;


export type GetVehiclesQueryRequest = {
  inputParameters: {
    clientId: string;
    referenceForAd: string;
    vIN: string;
  };
};

export type GetVehiclesQueryResponse = {
    vehiclesByFilter: VehicleDetails[];
};

export const useGetVehiclesQuery = (
  options?: QueryHookOptions<GetVehiclesQueryResponse, GetVehiclesQueryRequest>,
) => {
  return useQuery<GetVehiclesQueryResponse, GetVehiclesQueryRequest>(VEHICLES_QUERY, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });
};
