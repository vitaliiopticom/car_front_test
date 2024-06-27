import { gql, QueryHookOptions, useQuery } from '@/api';
import { User } from '@/modules/users';

export const VEHICLES_ALL_USERS_QUERY = gql`
  query GetVehiclesAllUsers {
    vehiclesAllUsers {
      id
      firstname
      lastname
    }
  }
`;

type Response = {
  vehiclesAllUsers: User[];
};

export const useGetVehiclesAllUsersQuery = (
  options?: QueryHookOptions<Response>,
) => {
  return useQuery<Response>(VEHICLES_ALL_USERS_QUERY, options);
};
