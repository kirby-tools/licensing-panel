import { useApi, usePanel } from 'kirbyuse'
import { t } from './utils'

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]']
const LOCAL_DOMAINS = ['local', 'test', 'ddev.site']

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export interface LicenseModalResult {
  isRegistered?: boolean
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
              help: t('modal.help.orderId', { label }),
            },
          },
        },
        on: {
          close: () => {
            resolve({})
          },
          submit: async (event: Record<string, any>) => {
            const { email, orderId } = event
            if (!email || !orderId) {
              panel.notification.error('Email and order ID are required')
              return
            }

            try {
              await register(email, Number(orderId))
            }
            catch (error) {
              panel.notification.error((error as Error).message)
              return
            }

            panel.dialog.close()
            panel.notification.success(t('activated'), { label })
            resolve({ isRegistered: true })
          },
        },
      })
    })
  }

  return {
    isLocalhost,
    openLicenseModal,
  }
}

function isLocal() {
  const { hostname } = window.location
  const isLocalhost = LOCALHOST_HOSTNAMES.includes(hostname)
  const isLocalDomain = LOCAL_DOMAINS.some(domain => hostname.endsWith(`.${domain}`))

  return isLocalhost || isLocalDomain
}
