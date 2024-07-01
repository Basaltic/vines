import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nLanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';

export const DEFAULT_LNG = 'zh';
// this is exported in order to avoid hard coding supported languages in more than 1 place
const resources = {
    zh: {
        translations: zh,
    },
    en: {
        translations: en,
    },
};

i18n.use(i18nLanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,

        fallbackLng: DEFAULT_LNG,

        debug: false,

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },

        // 'i18next-browser-languagedetector' options, see => https://github.com/i18next/i18next-browser-languageDetector?tab=readme-ov-file#detector-options
        detection: {},
    });
