import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { useApolloClient } from '@/api';
import { useApiContext } from '@/api/ApiProvider';
import { usePersistedState, useUpdateEffect } from '@/hooks';
import { ProfileTenant, useProfile } from '@/modules/users';
import { OptionType } from '@/types/form';

type Props = {
  children: ReactNode;
};

export type TenantContextType = {
  tenant: ProfileTenant | undefined;
  setTenantId: (tenantId: string) => void;
  tenants: OptionType[];
  isLoading: boolean;
};

const TenantContext = createContext<TenantContextType>({} as TenantContextType);

export const TenantProvider: FC<Props> = ({ children }) => {
  const { profile } = useProfile();
  const [isLoading, setLoading] = useState(false);
  const defaultTenantId = profile?.tenantAssignments?.[0]?.id;
  const [tenantId, setTenantId] = usePersistedState<string | undefined>(
    'current_tenant',
    defaultTenantId,
  );
  const apiContext = useApiContext();
  const apolloClient = useApolloClient();

  const value = useMemo<TenantContextType>(
    () => ({
      tenant: profile?.tenantAssignments?.find((t) => t.id === tenantId),
      setTenantId,
      tenants:
        profile?.tenantAssignments?.map((tenant) => ({
          value: tenant.id,
          label: tenant.name,
        })) || [],
      isLoading,
    }),
    [profile?.tenantAssignments, setTenantId, tenantId, isLoading],
  );

  console.log(profile, '@@@@@@@@@@@', tenantId, defaultTenantId);

  useEffect(() => {
    const firstTenantId = value?.tenants?.[0]?.value;

    if (!value.tenant?.id && firstTenantId) {
      value.setTenantId(firstTenantId);
    }
  }, [value]);

  useLayoutEffect(() => {
    if (value.tenant?.id) {
      apiContext.setTenant(value.tenant.id);
    }
  }, [value.tenant?.id, apiContext]);

  // This shows brief loading when changing tenant so all the queries can be cleared,
  // and you can fetch fresh data from new tenant.
  useUpdateEffect(() => {
    if (value.tenant?.id) {
      let timeout: NodeJS.Timeout;
      const clear = async () => {
        setLoading(true);
        await apolloClient.clearStore();

        timeout = setTimeout(() => setLoading(false), 300);
      };
      clear();

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [value.tenant?.id]);

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
