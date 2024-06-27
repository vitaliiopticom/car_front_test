import { test, expect } from 'vitest';
import {
  productListFiltersDefaultValues,
  PRODUCT_DATA_VIEW_ID,
} from './constant';

test('productListFiltersDefaultValues has correct properties and values', () => {
  const expectedValues = {
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

  expect(productListFiltersDefaultValues).toEqual(expectedValues);
});

test('PRODUCT_DATA_VIEW_ID has correct value', () => {
  expect(PRODUCT_DATA_VIEW_ID).toBe('product_data_view');
});
