export type LeadBase = {
  id: string;
  tenantId: string;
  platform: string;
  clientInfo: {
    title: string;
    firstName: string;
    lastName: string;
    language: string;
    emails: string[];
    telephones: string[];
    mobiles: string[];
  };
  emailInfo: {
    emailSubject: string;
  };
  leadState: string;
  businessState: string;
  firstResponse: boolean | null;
  rating: number | null;
  leadSource: string;
  manuallyCreated: boolean;
  agentId: string;
  createdAt: string;
  createdBy: string;
};

export type Lead = LeadBase;

export type LeadsListFiltersType = {
  platform: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
};

export type LeadFormValuesBase = {
  id: string;
  tenantId: string;
  platform: string;
  clientInformation: {
    title: string;
    firstName: string;
    lastName: string;
    language: string;
    emails: string[];
    telephones: string[];
    mobiles: string[];
  };
  emailDetails: {
    emailSubject: string;
  };
  leadState: string;
  businessState: string;
  firstResponse: boolean | null;
  rating: number | null;
  leadSource: string;
  manuallyCreated: boolean;
  agentId: string;
  createdAt: string;
  createdBy: string;
};

export type CreateLeadFormValues = LeadFormValuesBase;
export type UpdateLeadFormValues = LeadFormValuesBase;

export type LeadMessage = {
  id: string;
  body: string;
  isFromClient: boolean;
  timestamp: string;
};

export type LeadResponse = LeadBase;

export interface ClientInformation {
  title: string;
  firstName: string;
  lastName: string;
  language: string;
  emails: string[];
  telephones: string[];
  mobiles: string[];
}

export interface EmailDetails {
  emailSubject: string;
}

export interface LeadData {
  leadById: Lead;
}

export enum LeadStateEnum {
    ToProcess = 'TO_PROCESS',
    InFollowUp = 'IN_FOLLOW_UP',
    Lost = 'LOST',
    Won = 'WON',
    Cancelled = 'CANCELLED'
}

export enum BusinessStateEnum {
    ContactDeptSales = 'CONTACT_DEPT_SSLES',
    Discarded = 'DISCARDED',
    Caropticom = 'CAROPTICOM',
    Inacessible = 'INACESSIBLE',
    RebootWithoutPhone = 'REBOOT_WITHOUT_PHONE',
    VOChangeEstimate = 'VO_CHANGE_ESTIMATE',
    QuoteSent = 'QUOTE_SENT',
    InNegotitation = 'IN_NEGOTITATION',
    Sold = 'SOLD',
    Lost = 'LOST'
}

export interface LeadVehicles {
  id: string;
  leadId: string;
  referenceForAd: string;
  vehicleId: string;
  vIN: string;
}
