import { gql, QueryHookOptions, useQuery } from '@/api';

export const VEHICLES_MAKES_QUERY = gql`
  query GetVehiclesMakes(
    $inputParameters: VehiclesDefaultFilterParametersInput!
  ) {
    vehiclesMakes(inputParameters: $inputParameters)
  }
`;

export type Request = {
  inputParameters: {
    tenantIds: string[];
    userIds: string[];
  };
};

type Response = {
  vehiclesMakes: (string | null)[];
};

export const useVehiclesMakesQuery = (
  options?: QueryHookOptions<Response, Request>,
) => {
  return useQuery<Response, any>(VEHICLES_MAKES_QUERY, options);
};
