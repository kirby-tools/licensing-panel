export type Locale = string
export type Message = string
export type Messages = Record<string, Message>

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
