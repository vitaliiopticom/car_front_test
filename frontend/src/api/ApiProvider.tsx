import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ENV_CONFIG } from '@/config/env';
import { useGetLatest } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useAuth } from '@/modules/auth';
// Automatically generated types from BE
import possibleTypes from '../../scripts/possibleTypes.json';
import { ERROR_CODES } from './errorCodes';
import {
  handleErrorNotifications,
  hasGqlErrorCode,
  hasNetworkStatusCode,
} from './utils';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

type Props = {
  children: ReactNode;
};
type ApiContextRef = {
  tenantId: string;
};
type ApiContextType = {
  setTenant: (tenantId: string) => void;
};
const ApiContext = createContext<ApiContextType>({} as ApiContextType);
const cache = new InMemoryCache({ possibleTypes });
export const ApiProvider: FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const { getToken, signOut } = useAuth();
  const contextApiRef = useRef<ApiContextRef>({ tenantId: '' });
  const getT = useGetLatest(t);
  const client = useMemo(() => {
    const authLink = setContext(async () => {
      const token = await getToken();
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'x-tenant-id': contextApiRef.current.tenantId || '',
        },
      };
    });
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      const isUnauthenticated =
        hasNetworkStatusCode(401, networkError) ||
        hasGqlErrorCode(ERROR_CODES.AUTH_NOT_AUTHENTICATED, graphQLErrors);
      handleErrorNotifications(getT(), graphQLErrors);
      if (isUnauthenticated) {
        signOut();
      }
    });
    const httpLink = new HttpLink({
      uri: ENV_CONFIG.API_URL_PRIVATE,
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: 'ws://localhost:5000/graphql-private',
      }),
    );

    console.log('wsLink', wsLink);
    const splitLink = split(
      ({ query }) => {
        console.log('query', query);
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
    return new ApolloClient({
      link: from([errorLink, authLink, splitLink]),
      cache,
    });
  }, [getT, getToken, signOut]);
  const contextApi = useMemo<ApiContextType>(
    () => ({
      setTenant: (tenantId) => {
        contextApiRef.current.tenantId = tenantId;
      },
    }),
    [],
  );
  return (
    <ApolloProvider client={client}>
      <ApiContext.Provider value={contextApi}>{children}</ApiContext.Provider>
    </ApolloProvider>
  );
};
export const useApiContext = () => useContext(ApiContext);
