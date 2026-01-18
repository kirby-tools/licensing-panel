import { TRANSLATIONS } from './constants'

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]']
const LOCAL_DOMAINS = ['local', 'test', 'ddev.site']

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

export function t(key = '', data?: Record<string, string>) {
  const languageCode = window.panel.translation.code
  const translation = TRANSLATIONS?.[languageCode]?.[key] ?? key

  return data ? template(translation, data) : translation
}

export function isLocal() {
  const { hostname } = window.location
  const isLocalhost = LOCALHOST_HOSTNAMES.includes(hostname)
  const isLocalDomain = LOCAL_DOMAINS.some(domain => hostname.endsWith(`.${domain}`))

  return isLocalhost || isLocalDomain
}
