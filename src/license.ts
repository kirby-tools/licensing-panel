import type { ComponentPublicInstance, MaybeRef } from 'vue'
import type { LicenseStatus } from './types'
import { usePanel } from 'kirbyuse'
import { unref } from 'vue'
import { BACKEND_MESSAGES, INTEGRITY_ERROR } from './constants'

export function useLicense() {
  const panel = usePanel()

  const assertActivationIntegrity = ({ component, licenseStatus }: {
    component: MaybeRef<ComponentPublicInstance | null | undefined>
    licenseStatus: MaybeRef<LicenseStatus>
  }) => {
    if (unref(licenseStatus) === 'active')
      return

    const element = unref(component)?.$el as HTMLElement | undefined

    if (!element) {
      panel.notification.error(INTEGRITY_ERROR)
      return
    }

    const style = window.getComputedStyle(element)
    if (
      style.display === 'none'
      || style.visibility === 'hidden'
      || style.opacity === '0'
      || style.clipPath === 'inset(100%)'
    ) {
      panel.notification.error(INTEGRITY_ERROR)
      return
    }

    // The position is no signal: a field below the fold mounts off-screen.
    const rect = element.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      panel.notification.error(INTEGRITY_ERROR)
    }
  }

  // Reads the strings the System view and the PHP dialogs use
  const backendT = (key: keyof typeof BACKEND_MESSAGES) =>
    panel.t(`kirby-tools.license.${key}`, {}, BACKEND_MESSAGES[key])

  return {
    assertActivationIntegrity,
    backendT,
  }
}
