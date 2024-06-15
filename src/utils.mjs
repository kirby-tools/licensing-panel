import { usePanel } from 'kirbyuse'
import { TRANSLATIONS } from './constants.mjs'

export function t(key, data, fallback) {
  const panel = usePanel()
  const languageCode = panel.translation.code
  const translation = TRANSLATIONS?.[languageCode]?.[key] ?? fallback
  if (!translation)
    return

  return data ? template(translation, data) : translation
}

export function template(input, values, fallback) {
  return input.replace(
    /\{(\w+)\}/g,
    (_, key) => values[key] || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key),
  )
}
