import { gql, QueryHookOptions, useQuery } from '@/api';

export const VEHICLES_MODEL_YEAR_QUERY = gql`
  query GetVehiclesModelYears(
    $inputParameters: VehiclesModelYearsFilterParametersInput!
  ) {
    vehiclesModelYears(inputParameters: $inputParameters)
  }
`;

export type Request = {
  inputParameters: {
    tenantIds: string[];
    userIds: string[];
    make: string;
    model: string;
  };
};

type Response = {
  vehiclesModelYears: number[];
};

export const useVehiclesModelYearQuery = (
  options?: QueryHookOptions<Response, Request>,
) => {
  return useQuery<Response, any>(VEHICLES_MODEL_YEAR_QUERY, options);
};
