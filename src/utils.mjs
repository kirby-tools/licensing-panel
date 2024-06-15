import { TRANSLATIONS } from './constants.mjs'

export function t(key, language = 'en') {
  return TRANSLATIONS[language][key]
}
