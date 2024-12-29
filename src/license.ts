import type { ComponentPublicInstance } from 'vue'
import type { LicenseStatus, MaybeRef } from './types'
import { unref, usePanel } from 'kirbyuse'
import { isLocal, t } from './utils'

const ERROR_MESSAGE_TRANSLATIONS: Record<string, string> = {
  'Unauthorized': 'errors.validation.invalidCredentials',
  'License key not valid for this plugin': 'errors.license.invalidPlugin',
  'License key not valid for this plugin version': 'errors.license.versionMismatch',
  'License key not valid for this plugin version, please upgrade your license': 'errors.license.needsUpgrade',
  'License key already activated': 'errors.activation.alreadyUsed',
}

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export interface LicenseModalResult {
  isLicenseActive: boolean
}

export function useLicense(licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const isLocalhost = isLocal()

  const openLicenseModal = () => {
    let isLicenseActive = false

    const { label } = licenseOptions
    const fields = {
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
    }

    return new Promise<LicenseModalResult>((resolve) => {
      panel.dialog.open({
        component: 'k-form-dialog',
        props: {
          submitButton: {
            icon: 'check',
            theme: 'love',
            text: t('activate', { label }),
          },
          fields,
        },
        on: {
          // Close event will always be triggered, even on submit
          close: () => {
            resolve({ isLicenseActive })
          },
          submit: async (event: Record<string, any>) => {
            isLicenseActive = await activateLicense(event, licenseOptions)

            if (isLicenseActive) {
              panel.dialog.close()
              panel.notification.success(t('activated'))
            }
          },
        },
      })
    })
  }

  const assertActivationIntegrity = async ({ component, licenseStatus }: {
    component: MaybeRef<ComponentPublicInstance | null | undefined>
    licenseStatus: MaybeRef<LicenseStatus>
  }) => {
    if (unref(licenseStatus) === 'active') {
      return
    }

    const _component = unref(component)

    if (
      !_component?.$el
      || window.getComputedStyle(_component.$el).display === 'none'
      || window.getComputedStyle(_component.$el).visibility === 'hidden'
      || window.getComputedStyle(_component.$el).opacity === '0'
    ) {
      throw new Error('Are you trying to hide the activation buttons? Please buy a license.')
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
    panel.notification.error(ERROR_MESSAGE_TRANSLATIONS[message]
      ? t(ERROR_MESSAGE_TRANSLATIONS[message])
      : message)
    return false
  }
}
