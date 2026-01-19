export type Locale = string
export type Message = string
export type Messages = Record<string, Message>

export const INTEGRITY_ERROR = 'The activation buttons appear to be hidden. Please purchase a license.'

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
}
