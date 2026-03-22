import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import he from './locales/he.json'
import en from './locales/en.json'
import zh from './locales/zh.json'

const RTL_LANGS = new Set(['he'])

function applyDir(lang: string) {
  const dir = RTL_LANGS.has(lang) ? 'rtl' : 'ltr'
  document.documentElement.dir  = dir
  document.documentElement.lang = lang
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: he },
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'he',
    supportedLngs: ['he', 'en', 'zh'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'mipo_lang',
    },
    interpolation: { escapeValue: false },
  })

// apply direction on init + every language change
applyDir(i18n.resolvedLanguage ?? i18n.language ?? 'he')
i18n.on('languageChanged', applyDir)

export default i18n
