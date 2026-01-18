import type { ComponentPublicInstance } from 'vue'
import type { LicenseStatus, MaybeRef } from './types'
import { unref, useDialog, usePanel } from 'kirbyuse'
import { ERROR_KEY_MAP, INTEGRITY_ERROR } from './constants'
import { isLocalHost, t } from './utils'

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export interface LicenseModalResult {
  isLicenseActive: boolean
}

export function useLicense(licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const { openFieldsDialog } = useDialog()
  const isLocalhost = isLocalHost()

  const openLicenseModal = async () => {
    const { label } = licenseOptions

    const result = await openFieldsDialog({
      submitButton: {
        icon: 'check',
        theme: 'love',
        text: t('activate', { label }),
      },
      fields: {
        info: {
          type: 'info',
          text: t('modal.fields.info', { label }),
        },
        email: {
          label: panel.t('email'),
          type: 'email',
        },
        orderId: {
          label: 'Order ID',
          type: 'text',
          help: t('modal.fields.orderId.help', { label }),
        },
      },
      onSubmit: async (value) => {
        const isLicenseActive = await activateLicense(value, licenseOptions)

        if (!isLicenseActive) {
          return false
        }

        panel.notification.success(t('activated'))
        return { isLicenseActive }
      },
    })

    return {
      isLicenseActive: result?.isLicenseActive ?? false,
    }
  }

  const assertActivationIntegrity = ({ component, licenseStatus }: {
    component: MaybeRef<ComponentPublicInstance | null | undefined>
    licenseStatus: MaybeRef<LicenseStatus>
  }) => {
    if (unref(licenseStatus) === 'active') {
      return
    }

    const element = unref(component)?.$el as HTMLElement | undefined

    if (!element) {
      throw new Error(INTEGRITY_ERROR)
    }

    const style = window.getComputedStyle(element)
    if (
      style.display === 'none'
      || style.visibility === 'hidden'
      || style.opacity === '0'
      || style.clipPath === 'inset(100%)'
      || style.transform.includes('scale(0')
    ) {
      throw new Error(INTEGRITY_ERROR)
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
      throw new Error(INTEGRITY_ERROR)
    }
  }

  return {
    isLocalhost,
    assertActivationIntegrity,
    openLicenseModal,
  }
}

async function activateLicense(event: Record<string, any>, licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const { email, orderId } = event

  if (!email || !orderId) {
    panel.notification.error(t('errors.validation.missingFields'))
    return false
  }

  try {
    const response = await panel.api.post(`${licenseOptions.apiNamespace}/activate`, {
      email,
      orderId: Number(orderId),
    })

    if (response?.status !== 'ok') {
      throw new Error('Failed to activate license key')
    }

    return true
  }
  catch (error) {
    const message = (error as Error).message
    panel.notification.error(ERROR_KEY_MAP[message]
      ? t(ERROR_KEY_MAP[message])
      : message)
    return false
  }
}
