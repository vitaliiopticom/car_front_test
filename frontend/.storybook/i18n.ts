import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'EN',
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    defaultNS: 'Common',
    ns: ['Common'],
    supportedLngs: ['EN'],
  });

export default i18n;
