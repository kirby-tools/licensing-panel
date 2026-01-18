import { I18N_MESSAGES } from './constants'

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]', '0.0.0.0']
const LOCAL_TLD_SUFFIXES = [
  'localhost',
  'local', // Local by Flywheel, general
  'test', // Laravel Herd, Valet
  'ddev.site', // DDEV
  'lndo.site', // Lando
  'nitro', // Craft Nitro
  'dev.cc', // ServBay
]

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
  const translation = I18N_MESSAGES?.[languageCode]?.[key] ?? key

  return data ? template(translation, data) : translation
}

export function isLocalHost() {
  const { hostname } = window.location
  const isLocalHostname = LOCALHOST_HOSTNAMES.includes(hostname)
  const isLocalTld = LOCAL_TLD_SUFFIXES.some(suffix => hostname.endsWith(`.${suffix}`))

  return isLocalHostname || isLocalTld
}
