import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationRU from './locales/ru.json'
import translationEN from './locales/en.json'

const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        // debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n