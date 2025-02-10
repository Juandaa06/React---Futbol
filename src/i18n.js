import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';  // 🔥 Importa el backend para cargar JSON

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi) // 🔥 Cargar traducciones desde archivos locales
  .init({
    fallbackLng: 'es',
    detection: {
      order: ['navigator', 'htmlTag', 'localStorage', 'cookie'],
      caches: ['localStorage', 'cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // 📂 Ruta de los archivos JSON
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
