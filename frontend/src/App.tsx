import { FC } from 'react';

import { ApiProvider } from '@/api/ApiProvider';
import {
  ErrorBoundary,
  LangProvider,
  Notifications,
} from '@/components/shared';
import { ConfigProvider } from '@/config/ConfigProvider';
import { AuthProvider } from '@/modules/auth';
import { TenantProvider } from '@/modules/tenants';
import { ProfileProvider } from '@/modules/users';
import { Router } from '@/router/Router';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Notifications />
      <ConfigProvider>
        <AuthProvider>
          <ApiProvider>
            <ProfileProvider>
              <LangProvider>
                <TenantProvider>
                  <Router />
                </TenantProvider>
              </LangProvider>
            </ProfileProvider>
          </ApiProvider>
        </AuthProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};
