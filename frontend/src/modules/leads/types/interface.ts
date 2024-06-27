interface ClientInformation {
  title: number;
  firstName: string;
  lastName: string;
  emails: string[];
  telephones: string[];
  mobiles: string[];
  language: number;
}

interface EmailDetails {
  emailSubject: string;
}

interface Lead {
  id: string;
  tenantId: string;
  platform: string;
  clientInfo: ClientInformation;
  emailInfo: EmailDetails;
  leadState: number;
  businessState: number;
  firstResponse: boolean;
  rating: number;
  leadSource: number;
  // manuallyCreated: boolean;
  agentId: string;
  createdAt: string;
  createdBy: string;
  _rid: string;
  _self: string;
  _etag: string;
  _attachments: string;
  _ts: number;
}

export type { Lead };
