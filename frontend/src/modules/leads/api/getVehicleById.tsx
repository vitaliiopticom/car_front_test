import { gql, QueryHookOptions, useQuery } from '@/api';

import { VehicleDetails } from '../types/vehicleTypes';

export const GET_VEHICLE_QUERY = gql`
  query getVehicleById($id: String!) {
    vehicleById(id: $id) {
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
            firstRegistration
            aBS
            accidentDamaged
            airbag
            airbagDriver
            airbagFront
            airbagLateral
            airbagPassenger
            airbagRear
            alarm
            androidAuto
            antiFog
            appleCarPlay
            armrest
            armrestRear
            audio
            audiSoundSystem
            auxiliaryHeating
            blindSpotWarning
            bluetooth
            bookingDate
            camera
            camera360
            centralLocking
            climaBiZone
            climaFourZones
            climaThreeZones
            cruiseControl
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
        aEROComment
        cO2Emission
        consumptionCombined
        consumptionInner
        consumptionOuter
        consumptionPowerCombined
        cylinderCapacity
        fullNameMasterDelegated
        hybridPlugin
        isImportedVehicle
        lastRevisionDate
        lastRevisionlByName
        rangeExtender
        revisionOk
    }
  }
`;


export type GetVehicleByIdQueryRequest = {
  id: string
};

export type GetVehicleByIdQueryResponse = {
  vehicleById: VehicleDetails;
};



export const useGetVehicleByIdQuery = (
  options?: QueryHookOptions<GetVehicleByIdQueryResponse, GetVehicleByIdQueryRequest>,
) => {
  return useQuery<GetVehicleByIdQueryResponse, GetVehicleByIdQueryRequest>(
    GET_VEHICLE_QUERY,
    { fetchPolicy: 'no-cache', ...options },
  );
};
