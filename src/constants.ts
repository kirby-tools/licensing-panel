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
      'modal.fields.info': 'Thanks for purchasing {label}! Please enter your email address and order ID to activate your license.',
      'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Find your order number</a> on Lemon Squeezy or <a href="mailto:hello@kirby.tools">contact us</a> if you cannot find it.',
      'errors.validation.missingFields': 'Email address and order ID are required',
      'activate': 'Activate',
      'buy': 'Buy a license',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin activated!',
    },
    de: {
      'modal.fields.info': 'Dankeschön für den Kauf von {label}! Bitte gib deine E-Mail-Adresse und Bestellnummer ein, um deine Lizenz zu aktivieren.',
      'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Finde deine Bestellnummer</a> bei Lemon Squeezy oder <a href="mailto:hello@kirby.tools">kontaktiere uns</a>, wenn du sie nicht finden kannst.',
      'errors.validation.missingFields': 'E-Mail-Adresse und Bestellnummer sind notwendig',
      'activate': 'Aktivieren',
      'buy': 'Lizenz kaufen',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin aktiviert!',
    },
    fr: {
      'modal.fields.info': 'Merci d\'avoir acheté {label} ! Veuillez saisir votre adresse e-mail et votre numéro de commande pour activer votre licence.',
      'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Trouvez votre numéro de commande</a> sur Lemon Squeezy ou <a href="mailto:hello@kirby.tools">contactez-nous</a> si vous ne le trouvez pas.',
      'errors.validation.missingFields': 'Adresse e-mail et numéro de commande requis',
      'activate': 'Activer',
      'buy': 'Acheter une licence',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin activé !',
    },
    nl: {
      'modal.fields.info': 'Bedankt voor het kopen van {label}! Voer je e-mailadres en bestelnummer in om je licentie te activeren.',
      'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Vind je bestelnummer</a> op Lemon Squeezy of <a href="mailto:hello@kirby.tools">neem contact met ons op</a> als je het niet kunt vinden.',
      'errors.validation.missingFields': 'E-mailadres en bestelnummer zijn verplicht',
      'activate': 'Activeren',
      'buy': 'Koop een licentie',
      'upgrade': 'Upgrade',
      'notification.success': 'Plugin geactiveerd!',
    },
    es: {
      'modal.fields.info': '¡Gracias por comprar {label}! Introduce tu dirección de correo electrónico y número de pedido para activar tu licencia.',
      'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Encuentra tu número de pedido</a> en Lemon Squeezy o <a href="mailto:hello@kirby.tools">contáctanos</a> si no lo encuentras.',
      'errors.validation.missingFields': 'La dirección de correo electrónico y el número de pedido son obligatorios',
      'activate': 'Activar',
      'buy': 'Comprar licencia',
      'upgrade': 'Actualizar',
      'notification.success': '¡Plugin activado!',
    },
    it: {
      'modal.fields.info': 'Grazie per aver acquistato {label}! Inserisci il tuo indirizzo email e il numero d\'ordine per attivare la licenza.',
      'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Trova il tuo numero d\'ordine</a> su Lemon Squeezy o <a href="mailto:hello@kirby.tools">contattaci</a> se non riesci a trovarlo.',
      'errors.validation.missingFields': 'Indirizzo email e numero d\'ordine sono obbligatori',
      'activate': 'Attiva',
      'buy': 'Acquista licenza',
      'upgrade': 'Aggiorna',
      'notification.success': 'Plugin attivato!',
    },
  }
