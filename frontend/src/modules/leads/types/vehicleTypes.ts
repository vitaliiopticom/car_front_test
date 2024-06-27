// import { VehicleDetails } from '../../content/types'
export interface VehicleProposed {
  id: number;
  images: string[];
  brand: string;
  price: string;
  kilometers: string;
  model: string;
  immatriculationDate: string;
  available: boolean;
  availabilityDate: string;
  vin: string;
}


export type VehicleCompany = {
  companyName: string;
};

export type Vehicle = {
  allImagesArchiveUri: string;
  bodyType: string;
  company: VehicleCompany;
  createdAt: Date;
  fuelType: string;
  id: string;
  make: string;
  model: string;
  modelYear: string;
  brand: string;
  processedImagesArchiveSize: number;
  processedImagesArchiveUri: string;
  // user: User;
  vin: string;
  available: boolean;
  availabilityDate: string;
  detail: VehicleDetails
};

export type FilterValues = {
  bodyTypes: string | null;
  dateFrom: Date | string | null;
  dateTo: Date | string | null;
  fuelTypes: string | null;
  makes: string | null;
  modelYears: string | null;
  models: string | null;
  tenantIds: string[];
  parentTenantIds: string[];
  userIds: string[];
  vIN: string;
};

export type VehicleDetails = {
  id: string;
  name: string;
  model: string;
  make: string;
  fullName: string;
  country: string;
  created: string;
  published: boolean;
  stock: number;
  structure: string;
  imageCount: number;
  fuel: string;
  companyName: string;
  constructionYear: string;
  price: VehiclePrice;
  unitDetails: VehicleUnitDetails[];
  firstImageDAT: VehicleImage;
};

export type VehicleImage = {
  path: string;
  isLastPhoto: boolean;
  isDeleted: boolean;
  order: number;
}

export type VehiclePrice = {
  offerPrice: number;
  purchasingPrice: number;
  grossPrice: number;
  netPrice: number;
}
export type VehicleUnitDetails = {
  kilometers: number;
  vIN: string;
  exteriorColor: string;
  colorName: string;
  available: boolean;
  availableFromDate: string;
  localization: string;
  referenceForAd: string;
  firstRegistration: string;
}



