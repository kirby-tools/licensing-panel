import { I18N_MESSAGES } from './constants'

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

export function t(key: string, data?: Record<string, string>) {
  const languageCode = window.panel.translation.code
  // Kirby ships regional codes like `es_ES` or `pt_BR` next to bare ones
  const messages = I18N_MESSAGES[languageCode] ?? I18N_MESSAGES[languageCode.split('_')[0]!]
  const translation = messages?.[key] ?? I18N_MESSAGES.en![key] ?? key

  return data ? template(translation, data) : translation
}
