import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';
import cat from './cat.json';

const resources = {
  es: {
    translation: es,
  },
  cat: {
    translation: cat,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'cat',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
