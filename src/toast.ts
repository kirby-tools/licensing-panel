import type { LicenseStatus } from './types'
import { isLocalDev, usePanel } from 'kirbyuse'

export async function showLicenseToastOnce({ storageKey, threshold, resolveContext, message }: {
  storageKey: string
  threshold: number
  resolveContext: () => Promise<{ licenseStatus?: LicenseStatus }>
  message: string
}): Promise<void> {
  if (isLocalDev())
    return

  const storedValue = sessionStorage.getItem(storageKey)
  if (storedValue === 'done')
    return

  const callCount = (Number(storedValue) || 0) + 1
  sessionStorage.setItem(storageKey, String(callCount))

  if (callCount < threshold)
    return

  // Marks the toast done before the lookup, so a call during it doesn't show a second one.
  sessionStorage.setItem(storageKey, 'done')
  const { licenseStatus } = await resolveContext()

  if (licenseStatus === 'inactive' || licenseStatus === 'invalid')
    usePanel().notification.info({ icon: 'key', message })
}
