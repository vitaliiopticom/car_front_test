import { LANGS } from '@/i18n';

import { LeadStateEnum, BusinessStateEnum } from '../types/leadTypes';

export const genderOptions = ['MRS', 'MR'];

export const getGenderOptions = (t: any) => [
  { label: t('common.mrs'), value: genderOptions[0] },
  { label: t('common.mr'), value: genderOptions[1] },
];


export const languageOptions = LANGS.map((lang) => ({
  id: lang.code,
  name: lang.label,
}));

export const getLeadStatusOptions = (t: any, defaultLabel?: string) => {
  const options: { label: string; code: string }[] = [{
    label: defaultLabel || t('lead.leadStatus'),
    code: ''
  }];


  for (const key in LeadStateEnum) {
    if (LeadStateEnum.hasOwnProperty(key)) {
      const enumKey = key as keyof typeof LeadStateEnum;
      options.push({ label: t(`lead.status.${key}`), code: LeadStateEnum[enumKey] });
    }
  }

  return options;
}

export const getLeadBusinessStatusOptions = (t: any) => {
  const options: { label: string; code: string }[] = [{
    label: t('lead.businessStatusLabel'),
    code: ''
  }];


  for (const key in BusinessStateEnum) {
    if (BusinessStateEnum.hasOwnProperty(key)) {
      const enumKey = key as keyof typeof BusinessStateEnum;
      options.push({ label: t(`lead.businessState.${key}`), code: BusinessStateEnum[enumKey] });
    }
  }

  return options;
}