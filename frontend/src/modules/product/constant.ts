import type { ProductListFiltersType } from './types';

/**
 * Default values for the filters used in the product list.
 */
export const productListFiltersDefaultValues: ProductListFiltersType = {
  clone: false,
  status: undefined,
  vin: '',
  brand: '',
  model: '',
  finition: '',
  color: '',
  km: '',
  ref: '',
  price: '',
  dateAvailable: '',
  localization: '',
  dateMatriculation: '',
  images: 0,
};

export const PRODUCT_DATA_VIEW_ID = 'product_data_view';
