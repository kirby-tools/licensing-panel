import { useApi, usePanel } from 'kirbyuse'
import { t } from './utils'

export interface LicenseOptions {
  label: string
  apiNamespace: string
}

export function useLicense({
  label,
  apiNamespace,
}: LicenseOptions) {
  const panel = usePanel()
  const api = useApi()
  const isLocalhost = _isLocalhost()

  const register = async (email?: string, orderId?: number) => {
    if (!email || !orderId) {
      throw new Error('Email and order ID are required')
    }

    const response = await api.post(`${apiNamespace}/register`, { email, orderId })
    if (!response?.ok) {
      throw new Error('Registration failed')
    }

    return true
  }

  const openLicenseModal = () => {
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
          await panel.view.reload()
          panel.notification.success(t('activated'), { label })
        },
      },
    })
  }

  return {
    isLocalhost,
    openLicenseModal,
  }
}

function _isLocalhost() {
  const { hostname } = window.location
  const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(hostname)
  const isTestDomain = hostname.endsWith('.test')

  return isLocalhost || isTestDomain
}
