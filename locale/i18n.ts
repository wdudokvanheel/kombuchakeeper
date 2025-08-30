import en from '@/locale/en.json'
import nl from '@/locale/nl.json'
import fr from '@/locale/fr.json'
import de from '@/locale/de.json'
import * as Localization from "expo-localization"
import {getLocales} from "expo-localization"
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

void i18n
    .use(initReactI18next)
    .init({
        lng: deviceLanguage,
        fallbackLng: 'en',
        resources: {
            en: {translation: en},
            nl: {translation: nl},
            fr: {translation: fr},
            de: {translation: de}
        },
        interpolation: {escapeValue: false}
    })

export default i18n
