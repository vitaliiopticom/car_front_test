import type { IconName } from '@/components/elements';

export type Lang = {
  label: string;
  code: string;
  icon: IconName;
};

export enum LangCode {
  EN = 'en',
  DE = 'de',
  ES = 'es',
  FR = 'fr'
}

export const LANGS: Lang[] = [
  {
    code: LangCode.EN,
    label: 'English',
    icon: 'gbFlag',
  },
  {
    code: LangCode.FR,
    label: 'Français',
    icon: 'frFlag',
  },
  {
    code: LangCode.ES,
    label: 'Español',
    icon: 'esFlag',
  },
  {
    code: LangCode.DE,
    label: 'Deutsch',
    icon: 'deFlag',
  },
];

export const DEBUG_LANG: Lang = {
  code: 'cimode',
  label: 'Debug',
  icon: 'audit',
};
