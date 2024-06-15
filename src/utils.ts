import { usePanel } from 'kirbyuse'
import { TRANSLATIONS } from './constants'

export function t(key: string, data?: Record<string, string>, fallback?: string) {
  const panel = usePanel()
  const languageCode = panel.translation.code as string
  const translation = TRANSLATIONS?.[languageCode]?.[key] ?? fallback

  if (!translation)
    return

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
