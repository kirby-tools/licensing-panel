export type Locale = string
export type Message = string
export type Messages = Record<string, Message>

export const INTEGRITY_ERROR = 'The activation buttons appear to be hidden. Please purchase a license.'

/** English fallbacks for the strings the licensing backend registers. */
export const BACKEND_MESSAGES = {
  'status.invalid': 'Invalid license',
  'status.incompatible': 'License does not cover this plugin version',
  'info.upgrade': 'Upgrade License',
}

/// keep-sorted
export const I18N_MESSAGES: Record<Locale, Messages> = {
  de: {
    'activate': 'Aktivieren',
    'buy': 'Lizenz kaufen',
    'upgrade': 'Upgrade',
    'notification.success': 'Plugin aktiviert!',
  },
  en: {
    'activate': 'Activate',
    'buy': 'Buy a license',
    'upgrade': 'Upgrade',
    'notification.success': 'Plugin activated!',
  },
  es: {
    'activate': 'Activar',
    'buy': 'Comprar licencia',
    'upgrade': 'Actualizar',
    'notification.success': '¡Plugin activado!',
  },
  fr: {
    'activate': 'Activer',
    'buy': 'Acheter une licence',
    'upgrade': 'Upgrade',
    'notification.success': 'Plugin activé !',
  },
  it: {
    'activate': 'Attiva',
    'buy': 'Acquista licenza',
    'upgrade': 'Aggiorna',
    'notification.success': 'Plugin attivato!',
  },
  nl: {
    'activate': 'Activeren',
    'buy': 'Koop een licentie',
    'upgrade': 'Upgrade',
    'notification.success': 'Plugin geactiveerd!',
  },
  pt: {
    'activate': 'Ativar',
    'buy': 'Comprar licença',
    'upgrade': 'Atualizar',
    'notification.success': 'Plugin ativado!',
  },
}
