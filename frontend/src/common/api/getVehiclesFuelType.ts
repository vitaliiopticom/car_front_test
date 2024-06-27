import { gql, QueryHookOptions, useQuery } from '@/api';

export const VEHICLES_FUEL_TYPE_QUERY = gql`
  query GetVehiclesFuelTypes(
    $inputParameters: VehiclesDefaultFilterParametersInput!
  ) {
    vehiclesFuelTypes(inputParameters: $inputParameters)
  }
`;

export type Request = {
  inputParameters: {
    tenantIds: string[];
    userIds: string[];
  };
};

type Response = {
  vehiclesFuelTypes: (string | null)[];
};

export const useVehiclesFuelTypeQuery = (
  options?: QueryHookOptions<Response, Request>,
) => {
  return useQuery<Response, any>(VEHICLES_FUEL_TYPE_QUERY, options);
};
