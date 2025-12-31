import i18n from 'i18next';
import i18nLanguageDetector from 'i18next-browser-languagedetector';
import i18nextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(i18nextHttpBackend)
    .use(i18nLanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: 'zh',

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        // 'i18next-http-backend' options, see => https://github.com/i18next/i18next-http-backend?tab=readme-ov-file#backend-options
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        // 'i18next-browser-languagedetector' options, see => https://github.com/i18next/i18next-browser-languageDetector?tab=readme-ov-file#detector-options
        detection: {},
    });
