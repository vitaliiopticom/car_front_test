import { gql, QueryHookOptions, useQuery } from '@/api';

export const VEHICLES_BODY_TYPE_QUERY = gql`
  query GetVehiclesBodyTypes(
    $inputParameters: VehiclesDefaultFilterParametersInput!
  ) {
    vehiclesBodyTypes(inputParameters: $inputParameters)
  }
`;

export type Request = {
  inputParameters: {
    tenantIds: string[];
    userIds: string[];
  };
};

type Response = {
  vehiclesBodyTypes: (string | null)[];
};

export const useVehiclesBodyTypeQuery = (
  options?: QueryHookOptions<Response, Request>,
) => {
  return useQuery<Response, any>(VEHICLES_BODY_TYPE_QUERY, options);
};
