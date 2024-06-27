import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Layout, NotFound, SetupLayout } from '@/components/shared';
import { AuditRoutes } from '@/modules/audit';
import { Authorized, AuthRoutes } from '@/modules/auth';
import { CompaniesRoutes } from '@/modules/companies';
import { ContentRoutes } from '@/modules/content';
import { InvoicingRoutes } from '@/modules/invoicing';
import { OnboardingRoutes } from '@/modules/onboarding';
import { UsersRoutes } from '@/modules/users';

import { IndexRoute } from './IndexRoute';
import { routes } from './routesList';
import { LeadsRoutes } from '@/modules/leads/routes';
import { ProductRoutes } from '@/modules/product/routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<IndexRoute />} path={routes.index()} />
      <Route element={<SetupLayout />} path={routes.index()}>
        <Route
          element={<OnboardingRoutes />}
          path={`${routes.onboarding()}/*`}
        />
      </Route>
      <Route element={<Layout />} path={routes.index()}>
        <Route element={<AuditRoutes />} path={`${routes.audit()}/*`} />
        <Route element={<ContentRoutes />} path={`${routes.content()}/*`} />
        <Route
          element={<OnboardingRoutes />}
          path={`${routes.onboarding()}/*`}
        />
        <Route element={<InvoicingRoutes />} path={`${routes.invoicing()}/*`} />
        <Route element={<UsersRoutes />} path={`${routes.users()}/*`} />
        <Route element={<CompaniesRoutes />} path={`${routes.companies()}/*`} />
        <Route element={<LeadsRoutes />} path={`${routes.leads()}/*`} />
        {/* <Route element={<LeadsRoutes />} path={`${routes.incomingLeads()}/*`} /> */}
        <Route element={<ProductRoutes />} path={`${routes.product()}/*`} />

        <Route
          element={
            <Authorized>
              <NotFound />
            </Authorized>
          }
          path="*"
        />
      </Route>
      <Route element={<AuthRoutes />} path="/login/*" />
    </>,
  ),
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
