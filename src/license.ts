import type { ComponentPublicInstance } from 'vue'
import type { LicenseStatus, MaybeRef } from './types'
import { nextTick, unref, useApi, usePanel } from 'kirbyuse'
import { t } from './utils'

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]']
const LOCAL_DOMAINS = ['local', 'test', 'ddev.site']
const ERROR_MESSAGE_TRANSLATIONS: Record<string, string> = {
  'Unauthorized': 'modal.error.invalid.unauthorized',
  'License key not valid for this plugin': 'modal.error.invalid.licenseKey',
  'License key not valid for this plugin version': 'modal.error.incompatible.licenseKey',
  'License key already registered': 'modal.error.registered',
}

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export interface LicenseModalResult {
  isRegistered: boolean
}

export function useLicense(licenseOptions: LicenseOptions) {
  const panel = usePanel()
  const isLocalhost = isLocal()

  const openLicenseModal = () => {
    let isRegistered = false

    return new Promise<LicenseModalResult>((resolve) => {
      const { label } = licenseOptions
      panel.dialog.open({
        component: 'k-form-dialog',
        props: {
          submitButton: {
            icon: 'check',
            theme: 'love',
            text: t('activate', { label }),
          },
          fields: {
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
          },
        },
        on: {
          // Close event will always be triggered, even on submit
          close: () => {
            resolve({ isRegistered })
          },
          submit: async (event: Record<string, any>) => {
            isRegistered = await registerLicense(event, licenseOptions)
            if (isRegistered) {
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

    await nextTick()
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

async function registerLicense(event: Record<string, any>, {
  apiNamespace,
}: LicenseOptions) {
  const panel = usePanel()
  const { email, orderId } = event

  if (!email || !orderId) {
    panel.notification.error(t('modal.error.required.fields'))
    return false
  }

  try {
    const response = await panel.api.post(`${apiNamespace}/register`, {
      email,
      orderId: Number(orderId),
    })

    if (response?.status !== 'ok') {
      throw new Error('Failed to register license')
    }

    return true
  }
  catch (error) {
    let message = (error as Error).message
    message = ERROR_MESSAGE_TRANSLATIONS[message] || message
    panel.notification.error(message)
    return false
  }
}

function isLocal() {
  const { hostname } = window.location
  const isLocalhost = LOCALHOST_HOSTNAMES.includes(hostname)
  const isLocalDomain = LOCAL_DOMAINS.some(domain => hostname.endsWith(`.${domain}`))

  return isLocalhost || isLocalDomain
}
