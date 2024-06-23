import { nextTick, unref, useApi, usePanel } from 'kirbyuse'
import type { ComponentPublicInstance } from 'vue'
import { t } from './utils'
import type { License, MaybeRef } from './types'

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]']
const LOCAL_DOMAINS = ['local', 'test', 'ddev.site']

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export interface LicenseModalResult {
  isRegistered: boolean
}

export function useLicense({
  label,
  apiNamespace,
}: LicenseOptions) {
  const panel = usePanel()
  const api = useApi()
  const isLocalhost = isLocal()

  const register = async (email?: string, orderId?: number) => {
    if (!email || !orderId) {
      throw new Error('Email and order ID are required')
    }

    const response = await api.post(`${apiNamespace}/register`, { email, orderId })
    if (response?.status !== 'ok') {
      throw new Error('Registration failed')
    }

    return true
  }

  const openLicenseModal = () => {
    let isRegistered = false

    return new Promise<LicenseModalResult>((resolve) => {
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
            const { email, orderId } = event
            if (!email || !orderId) {
              panel.notification.error(t('modal.error.required.fields'))
              return
            }

            try {
              await register(email, Number(orderId))
            }
            catch (error) {
              let message = (error as Error).message
              if (message === 'License key not valid for this plugin') {
                message = t('modal.error.invalid.licenseKey')!
              }
              else if (message === 'License key already registered') {
                message = t('modal.error.registered')!
              }
              panel.notification.error(message)
              return
            }

            isRegistered = true
            panel.dialog.close()
            panel.notification.success(t('activated'))
          },
        },
      })
    })
  }

  const assertActivationIntegrity = async ({ component, license }: {
    component: MaybeRef<ComponentPublicInstance | null | undefined>
    license: MaybeRef<boolean | string | License>
  }) => {
    const _component = unref(component)
    const _license = unref(license)

    if (_license !== false) {
      return
    }

    await nextTick()

    if (
      !_component?.$el
      || window.getComputedStyle(_component.$el).display === 'none'
      || window.getComputedStyle(_component.$el).visibility === 'hidden'
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

function isLocal() {
  const { hostname } = window.location
  const isLocalhost = LOCALHOST_HOSTNAMES.includes(hostname)
  const isLocalDomain = LOCAL_DOMAINS.some(domain => hostname.endsWith(`.${domain}`))

  return isLocalhost || isLocalDomain
}
