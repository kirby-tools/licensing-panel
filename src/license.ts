import type { ComponentPublicInstance } from 'vue'
import type { LicenseStatus, MaybeRef } from './types'
import { unref, useDialog, usePanel } from 'kirbyuse'
import { INTEGRITY_ERROR } from './constants'
import { t } from './utils'

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export function useLicense(licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const { openFieldsDialog } = useDialog()

  const openLicenseModal = async () => {
    let isSubmitting = false

    await openFieldsDialog({
      fields: {
        info: {
          type: 'info',
          text: panel.t('kirby-tools.license.activate.info'),
        },
        email: {
          label: panel.t('kirby-tools.license.activate.email'),
          type: 'email',
          required: true,
        },
        licenseKey: {
          label: panel.t('kirby-tools.license.activate.licenseKey'),
          type: 'text',
          required: true,
          help: panel.t('kirby-tools.license.activate.licenseKey.help'),
        },
      },
      submitButton: {
        icon: 'check',
        theme: 'love',
        text: panel.t('kirby-tools.license.activate.submit'),
      },
      onSubmit: async (value) => {
        if (isSubmitting)
          return false

        isSubmitting = true

        const isLicenseActive = await activateLicense(value, licenseOptions)

        if (!isLicenseActive) {
          isSubmitting = false
          return false
        }

        panel.notification.success(t('notification.success'))
        await new Promise(resolve => setTimeout(resolve, 750))

        // Force a reload to refresh the plugin's cached context.
        window.location.reload()

        // Return a never-resolving promise to keep the dialog open
        // until the page reload completes.
        return new Promise(() => {})
      },
    })
  }

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
      || style.transform.includes('scale(0')
    ) {
      panel.notification.error(INTEGRITY_ERROR)
      return
    }

    // Check if element has zero dimensions or is off-screen
    const rect = element.getBoundingClientRect()
    if (
      rect.width === 0
      || rect.height === 0
      || rect.right < 0
      || rect.bottom < 0
      || rect.left > window.innerWidth
      || rect.top > window.innerHeight
    ) {
      panel.notification.error(INTEGRITY_ERROR)
    }
  }

  return {
    assertActivationIntegrity,
    openLicenseModal,
  }
}

async function activateLicense(event: Record<string, any>, licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const { email, licenseKey } = event

  if (!email || !licenseKey)
    return false

  try {
    const response = await panel.api.post(`${licenseOptions.apiNamespace}/activate`, {
      email,
      licenseKey,
    })

    if (response?.status !== 'ok') {
      throw new Error('Failed to activate license key')
    }

    return true
  }
  catch (error) {
    panel.notification.error((error as Error).message)
    return false
  }
}
