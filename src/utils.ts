import { I18N_MESSAGES } from './constants'

export function template(
  input: string,
  values: Record<string, string>,
  fallback?: string | ((key: string) => string),
) {
  return input.replace(
    // eslint-disable-next-line e18e/prefer-static-regex
    /\{(\w+)\}/g,
    (_, key) => values[key] || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key),
  )
}

export function t(key: string, data?: Record<string, string>) {
  const languageCode = window.panel.translation.code
  const translation = I18N_MESSAGES?.[languageCode]?.[key] ?? key

  return data ? template(translation, data) : translation
}
