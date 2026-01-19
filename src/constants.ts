export type Locale = string
export type Message = string
export type Messages = Record<string, Message>

export const ERROR_KEY_MAP: Record<string, string> = {
  'Unauthorized': 'kirby-tools.license.error.invalidCredentials',
  'License key not valid for this plugin': 'kirby-tools.license.error.invalid',
  'License key not valid for this plugin version': 'kirby-tools.license.error.incompatible',
  'License key not valid for this plugin version, please upgrade your license': 'kirby-tools.license.error.upgradeable',
  'License key already activated': 'kirby-tools.license.error.alreadyActivated',
}

export const INTEGRITY_ERROR = 'The activation buttons appear to be hidden. Please purchase a license.'

export const I18N_MESSAGES: Record<Locale, Messages>
/// keep-sorted
  = {
    en: {
      'activate': 'Activate',
      'buy': 'Buy a license',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin activated!',
    },
    de: {
      'activate': 'Aktivieren',
      'buy': 'Lizenz kaufen',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin aktiviert!',
    },
    fr: {
      'activate': 'Activer',
      'buy': 'Acheter une licence',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin activé !',
    },
    nl: {
      'activate': 'Activeren',
      'buy': 'Koop een licentie',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin geactiveerd!',
    },
    es: {
      'activate': 'Activar',
      'buy': 'Comprar licencia',
      'upgrade': 'Actualizar',
      'notification.success': '¡Plugin activado!',
    },
    it: {
      'activate': 'Attiva',
      'buy': 'Acquista licenza',
      'upgrade': 'Aggiorna',
      'notification.success': 'Plugin attivato!',
    },
  }
