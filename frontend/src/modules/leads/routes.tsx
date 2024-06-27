import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { OptiAndIncomingLeadsPage } from './pages/OptiAndIncomingLeadsPage';
import { LeadDetailPage } from './pages/LeadDetailPage';

export const LeadsRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<OptiAndIncomingLeadsPage />} index />
      <Route element={<OptiAndIncomingLeadsPage />} path="incoming" />
      <Route element={<LeadDetailPage />} path="detail/:id" />
    </Routes>
  );
};
