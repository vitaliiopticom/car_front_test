import { gql, QueryHookOptions, useQuery } from '@/api';

export const VEHICLES_MODEL_QUERY = gql`
  query GetVehiclesModels(
    $inputParameters: VehiclesModelsFilterParametersInput!
  ) {
    vehiclesModels(inputParameters: $inputParameters)
  }
`;

export type Request = {
  inputParameters: {
    tenantIds: string[];
    userIds: string[];
    make: string;
  };
};

type Response = {
  vehiclesModels: (string | null)[];
};

export const useVehiclesModelQuery = (
  options?: QueryHookOptions<Response, Request>,
) => {
  return useQuery<Response, any>(VEHICLES_MODEL_QUERY, options);
};
