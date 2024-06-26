import { DEFAULT_PAGE_SIZE } from '@/components/shared/DataView/constants';
import { getFirstAndCurrentDayOfMonth } from '@/utils/date';

import type { FilterValues, QualityCheckItem } from './types';
import { QualityIssue } from './enums';

export const CONTENT_ITEM_TYPE = {
  DETAILS: 'DETAILS',
  EXTERIOR: 'EXTERIOR',
  INTERIOR: 'INTERIOR',
  VIDEO: 'VIDEO',
} as const;

export const FILES_EVIDENCE_STATE = {
  onlyPhotos: 'onlyPhotos',
  onlyVideos: 'onlyVideos',
  all: 'all',
} as const;

export const IMAGE_TYPE = {
  ORIGINAL: 'ORIGINAL',
  PROCESSED: 'PROCESSED',
} as const;

export const VEHICLES_PAGINATION_DEFAULT = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
} as const;

export const VEHICLES_FILTER_DEFAULT: FilterValues = {
  bodyTypes: null,
  dateFrom: null,
  dateTo: null,
  fuelTypes: null,
  makes: null,
  modelYears: null,
  models: null,
  tenantIds: [],
  parentTenantIds: [],
  userIds: [],
  vIN: '',
};

export const STATISTICS_DATE_RANGE_FILTER_DEFAULT = {
  dateFrom: getFirstAndCurrentDayOfMonth().dateFrom,
  dateTo: getFirstAndCurrentDayOfMonth().dateTo,
};

export const OPTICONTENT_DATA_VIEW_ID = 'opticontent_data';

export const FALLBACK_IMAGE = '/images/thumbnail-fallback-car.svg';

export const UNKNOWN_OPTION = 'unknown';

export const PAGE_MESSAGES_NO_PHOTOS = {
  header: 'content.noPhotos.header',
  messageLine1: 'content.noPhotos.messageLine1',
  messageLine2: 'content.noPhotos.messageLine2',
} as const;

export const PAGE_MESSAGES_PHOTO_BOX_CREATING = {
  header: 'content.creatingPhotoBox.header',
  messageLine1: 'content.creatingPhotoBox.messageLine1',
  messageLine2: 'content.creatingPhotoBox.messageLine2',
  item1: 'content.howToUse',
  item2: 'content.contactSales',
} as const;

export const PAGE_MESSAGES_MISSING_OPTIPIX_ACCESS = {
  header: 'content.noPhotos.header',
  messageLine1: 'content.noPhotos2.messageLine1',
  messageLine2: 'content.noPhotos2.messageLine2',
} as const;

export const EXTERIOR_QUALITY_OPTIONS: QualityCheckItem[] = [
  {
    label: 'content.qualityFeedbackIssues.qualityGood',
    value: QualityIssue.QualityGood,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.sunReflections',
    value: QualityIssue.SunReflections,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.angle',
    value: QualityIssue.Angle,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.blurred',
    value: QualityIssue.Blurred,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.platePositioning',
    value: QualityIssue.PlatePositioning,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.positioningPlatform360',
    value: QualityIssue.PositioningPlatform360,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.imageNotProcessed',
    value: QualityIssue.ImageNotProcessed,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.segmentation',
    value: QualityIssue.Segmentation,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.exteriorLight',
    value: QualityIssue.ExteriorLight,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.embarrassingObject',
    value: QualityIssue.EmbarrassingObject,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.mode3In1',
    value: QualityIssue.Mode3In1,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.wrongPosition',
    value: QualityIssue.WrongPosition,
    checked: false,
  },
];

export const INTERIOR_QUALITY_OPTIONS: QualityCheckItem[] = [
  {
    label: 'content.qualityFeedbackIssues.qualityGood',
    value: QualityIssue.QualityGood,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.sunReflexion',
    value: QualityIssue.SunReflexion,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.photographerReflection',
    value: QualityIssue.PhotographersReflection,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.wrongAngle',
    value: QualityIssue.WrongAngle,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.imageTooDark',
    value: QualityIssue.ImageTooDark,
    checked: false,
  },
];

export const PROTOCOL_QUALITY_OPTIONS: QualityCheckItem[] = [
  {
    label: 'content.qualityFeedbackIssues.incorrectProtocolCi',
    value: QualityIssue.IncorrectProtocolCi,
    checked: false,
  },
  {
    label: 'content.qualityFeedbackIssues.textInputSpecificProblem',
    value: QualityIssue.TextInputSpecificProblem,
    checked: false,
  },
];
