export type ProductFormValuesBase = {
  clone: boolean;
  status: ProductStatus;
  vin: string;
  brand: string;
  model: string;
  finition: string;
  color: string;
  km: string;
  ref: string;
  price: string;
  dateAvailable: string;
  localization: string;
  dateMatriculation: string;
  images: number;
};

export enum ProductStatus {
  Available = 'available',
  Sold = 'sold',
}

/**
 * Represents the type for the filters used in the ProductList component.
 */
export type ProductListFiltersType = {
  clone: boolean;
  status: ProductStatus | undefined;
  vin: string;
  brand: string;
  model: string;
  finition: string;
  color: string;
  km: string;
  ref: string;
  price: string;
  dateAvailable: string;
  localization: string;
  dateMatriculation: string;
  images: number;
};
