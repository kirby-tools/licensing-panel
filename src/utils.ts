import { TRANSLATIONS } from './constants'

export function t(key = '', data?: Record<string, string>) {
  const languageCode = window.panel.translation.code
  const translation = TRANSLATIONS?.[languageCode]?.[key] ?? key

  return data ? template(translation, data) : translation
}

export function template(
  input: string,
  values: Record<string, string>,
  fallback?: string | ((key: string) => string),
) {
  return input.replace(
    /\{(\w+)\}/g,
    (_, key) => values[key] || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key),
  )
}
