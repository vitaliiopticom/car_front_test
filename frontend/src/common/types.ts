import { UploadFile } from '@/types/file';

import { Company } from '../modules/companies';

import {
  FILES_EVIDENCE_STATE,
} from './constants';

export type VehicleDetailParams = {
  id: string;
};

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  photoUrl: string;
};

export type Vehicles<T> = {
  vehicles: T;
  photoBoxStatus: string;
};

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
  processedImagesArchiveSize: number;
  processedImagesArchiveUri: string;
  user: User;
  vin: string;
};

type VehicleContentItem = {
  id: string;
  vehicleId?: string;
  position: number;
  user?: User;
};


export type VehicleVideo = VehicleContentItem & {
  video?: UploadFile & { attachmentType: any };
};

export type GeoLocation = {
  latitude: number;
  longitude: number;
  address: string;
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

export type ChangeVinNumberFormValues = {
  vin: string;
};

export type Photographer = {
  userId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  vehiclesActiveCount: number;
  vehiclesDeletedCount: number;
  vehiclesImagesCount: number;
  totalVehiclesCount: number;
};

export type CardsStatistics = {
  activeVehiclesCount: number;
  deletedVehiclesCount: number;
  totalVehiclesCount: number;
  vehiclesImagesCount: number;
};

export type StatisticsDateFilters = {
  dateFrom?: Date;
  dateTo?: Date;
};

export type StatisticsDateFiltersForApi = {
  dateFrom: string | null;
  dateTo: string | null;
};

export type FileEvidenceState = keyof typeof FILES_EVIDENCE_STATE;

export type CompanyGroup = Pick<Company, 'companyName' | 'tenantId'>;
