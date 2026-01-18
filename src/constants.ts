export type Locale = string
export type Message = string
export type Messages = Record<string, Message>

export const ERROR_KEY_MAP: Record<string, string> = {
  'Unauthorized': 'errors.validation.invalidCredentials',
  'License key not valid for this plugin': 'errors.license.invalid',
  'License key not valid for this plugin version': 'errors.license.incompatible',
  'License key not valid for this plugin version, please upgrade your license': 'errors.license.upgradeable',
  'License key already activated': 'errors.license.alreadyActivated',
}

export const INTEGRITY_ERROR = 'The activation buttons appear to be hidden. Please purchase a license.'

export const I18N_MESSAGES: Record<Locale, Messages> = {
  en: {
    'modal.fields.info': 'Thanks for purchasing {label}! Please enter your email address and order ID to activate your license.',
    'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Find your order number</a> on Lemon Squeezy or <a href="mailto:hello@kirby.tools">contact us</a> if you cannot find it.',
    'errors.validation.missingFields': 'Email address and order ID are required',
    'errors.validation.invalidCredentials': 'Email address or order ID is incorrect',
    'errors.license.invalid': 'License key invalid for this plugin',
    'errors.license.incompatible': 'License key invalid for this plugin version',
    'errors.license.upgradeable': 'License key invalid for this plugin version. Upgrade now on https://hub.kirby.tools.',
    'errors.license.alreadyActivated': 'License key already activated',
    'activate': 'Activate',
    'activated': 'Plugin activated',
    'buy': 'Buy a license',
    'upgrade': 'Upgrade',
  },
  de: {
    'modal.fields.info': 'Dankeschön für den Kauf von {label}! Bitte gib deine E-Mail-Adresse und Bestellnummer ein, um deine Lizenz zu aktivieren.',
    'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Finde deine Bestellnummer</a> bei Lemon Squeezy oder <a href="mailto:hello@kirby.tools">kontaktiere uns</a>, wenn du sie nicht finden kannst.',
    'errors.validation.missingFields': 'E-Mail-Adresse und Bestellnummer sind notwendig',
    'errors.validation.invalidCredentials': 'E-Mail-Adresse oder Bestellnummer ist falsch',
    'errors.license.invalid': 'Lizenzschlüssel ungültig für dieses Plugin',
    'errors.license.incompatible': 'Lizenzschlüssel ungültig für diese Plugin-Version',
    'errors.license.upgradeable': 'Lizenzschlüssel ungültig für diese Plugin-Version. Aktualisiere jetzt auf https://hub.kirby.tools.',
    'errors.license.alreadyActivated': 'Lizenzschlüssel bereits aktiviert',
    'activate': 'Aktivieren',
    'activated': 'Plugin aktiviert',
    'buy': 'Lizenz kaufen',
    'upgrade': 'Upgrade',
  },
  fr: {
    'modal.fields.info': 'Merci d\'avoir acheté {label} ! Veuillez saisir votre adresse e-mail et votre numéro de commande pour activer votre licence.',
    'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Trouvez votre numéro de commande</a> sur Lemon Squeezy ou <a href="mailto:hello@kirby.tools">contactez-nous</a> si vous ne le trouvez pas.',
    'errors.validation.missingFields': 'Adresse e-mail et numéro de commande requis',
    'errors.validation.invalidCredentials': 'Adresse e-mail ou numéro de commande incorrect',
    'errors.license.invalid': 'Clé de licence invalide pour ce plugin',
    'errors.license.incompatible': 'Clé de licence invalide pour cette version du plugin',
    'errors.license.upgradeable': 'Clé de licence invalide pour cette version du plugin. Mettez à niveau maintenant sur https://hub.kirby.tools.',
    'errors.license.alreadyActivated': 'Clé de licence déjà activée',
    'activate': 'Activer',
    'activated': 'Plugin activé',
    'buy': 'Acheter une licence',
    'upgrade': 'Upgrade',
  },
  nl: {
    'modal.fields.info': 'Bedankt voor het kopen van {label}! Voer je e-mailadres en bestelnummer in om je licentie te activeren.',
    'modal.fields.orderId.help': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Vind je bestelnummer</a> op Lemon Squeezy of <a href="mailto:hello@kirby.tools">neem contact met ons op</a> als je het niet kunt vinden.',
    'errors.validation.missingFields': 'E-mailadres en bestelnummer zijn verplicht',
    'errors.validation.invalidCredentials': 'E-mailadres of bestelnummer is onjuist',
    'errors.license.invalid': 'Licentiesleutel ongeldig voor deze plugin',
    'errors.license.incompatible': 'Licentiesleutel ongeldig voor deze pluginversie',
    'errors.license.upgradeable': 'Licentiesleutel ongeldig voor deze pluginversie. Upgrade nu op https://hub.kirby.tools.',
    'errors.license.alreadyActivated': 'Licentiesleutel al geactiveerd',
    'activate': 'Activeren',
    'activated': 'Plugin geactiveerd',
    'buy': 'Koop een licentie',
    'upgrade': 'Upgrade',
  },
}
