import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProductPage } from './pages/ProductPage';

/**
 * Renders the routes for the product module.
 * @returns The JSX element representing the routes.
 */
export const ProductRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<ProductPage />} index />
    </Routes>
  );
};
