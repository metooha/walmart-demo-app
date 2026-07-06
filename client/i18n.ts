import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enPages from './locales/en/pages.json';
import enMarty from './locales/en/marty.json';
import enWalmart from './locales/en/walmart.json';

import esCommon from './locales/es/common.json';
import esPages from './locales/es/pages.json';
import esMarty from './locales/es/marty.json';
import esWalmart from './locales/es/walmart.json';

import frCommon from './locales/fr/common.json';
import frPages from './locales/fr/pages.json';
import frMarty from './locales/fr/marty.json';
import frWalmart from './locales/fr/walmart.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        pages: enPages,
        marty: enMarty,
        walmart: enWalmart,
      },
      es: {
        common: esCommon,
        pages: esPages,
        marty: esMarty,
        walmart: esWalmart,
      },
      fr: {
        common: frCommon,
        pages: frPages,
        marty: frMarty,
        walmart: frWalmart,
      },
    },
    lng: undefined, // let detector decide
    fallbackLng: 'en',
    load: 'languageOnly', // 'en-US' → 'en'
    supportedLngs: ['en', 'es', 'fr'],
    defaultNS: 'common',
    ns: ['common', 'pages', 'marty', 'walmart'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
    initImmediate: false, // synchronous init since resources are bundled
  });

export default i18n;
