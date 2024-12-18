import type { ComponentPublicInstance } from 'vue'
import type { LicenseStatus, MaybeRef } from './types'
import { unref, usePanel } from 'kirbyuse'
import { isLocal, t } from './utils'

const ERROR_MESSAGE_TRANSLATIONS: Record<string, string> = {
  'Unauthorized': 'modal.error.invalid.unauthorized',
  'License key not valid for this plugin': 'modal.error.invalid.licenseKey',
  'License key not valid for this plugin version': 'modal.error.incompatible',
  'License key not valid for this plugin version, please upgrade your license': 'modal.error.upgradeable',
  'License key already registered': 'modal.error.registered',
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
        text: t('modal.info', { label }),
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
            isLicenseActive = await registerLicense(event, licenseOptions)

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

async function registerLicense(event: Record<string, any>, licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const { email, orderId } = event

  if (!email || !orderId) {
    panel.notification.error(t('modal.error.required.fields'))
    return false
  }

  try {
    const response = await panel.api.post(`${licenseOptions.apiNamespace}/register`, {
      email,
      orderId: Number(orderId),
    })

    if (response?.status !== 'ok') {
      throw new Error('Failed to register license')
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
