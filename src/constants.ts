export type Locale = string
export type Message = string
export type Messages = Record<string, Message>

export const TRANSLATIONS: Record<Locale, Messages> = {
  en: {
    'modal.info': 'Thanks for purchasing {label}! Please enter your email address and order ID to activate your license.',
    'modal.fields.orderId.help': 'Find your <a href="https://app.lemonsqueezy.com/my-orders" target="_blank">order number on Lemon Squeezy</a> or <a href="mailto:hello@kirby.tools">contact us</a> if you cannot find it.',
    'modal.error.required.fields': 'Email address and order ID are required',
    'modal.error.invalid.unauthorized': 'Email address or order ID is incorrect',
    'modal.error.invalid.licenseKey': 'License key invalid for this plugin',
    'modal.error.incompatible.licenseKey': 'License key invalid for this plugin version',
    'modal.error.registered': 'License key already registered',
    'activate': 'Activate',
    'activated': 'Plugin activated',
  },
  de: {
    'modal.info': 'Dankeschön für den Kauf von {label}! Bitte gib deine E-Mail-Adresse und Bestellnummer ein, um deine Lizenz zu aktivieren.',
    'modal.fields.orderId.help': 'Finde deine <a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Bestellnummer bei Lemon Squeezy</a> oder <a href="mailto:hello@kirby.tools">kontaktiere uns</a>, wenn du sie nicht finden kannst.',
    'modal.error.required.fields': 'E-Mail-Adresse und Bestellnummer sind notwendig',
    'modal.error.invalid.unauthorized': 'E-Mail-Adresse oder Bestellnummer ist falsch',
    'modal.error.invalid.licenseKey': 'Lizenzschlüssel ungültig für dieses Plugin',
    'modal.error.incompatible.licenseKey': 'Lizenzschlüssel ungültig für diese Plugin-Version',
    'modal.error.registered': 'Lizenzschlüssel bereits registriert',
    'activate': 'Aktivieren',
    'activated': 'Plugin aktiviert',
  },
  fr: {
    'modal.info': 'Merci d\'avoir acheté {label} ! Veuillez saisir votre adresse e-mail et votre numéro de commande pour activer votre licence.',
    'modal.fields.orderId.help': 'Trouvez votre <a href="https://app.lemonsqueezy.com/my-orders" target="_blank">numéro de commande sur Lemon Squeezy</a> ou <a href="mailto:hello@kirby.tools">contactez-nous</a> si vous ne le trouvez pas.',
    'modal.error.required.fields': 'Adresse e-mail et numéro de commande requis',
    'modal.error.invalid.unauthorized': 'Adresse e-mail ou numéro de commande incorrect',
    'modal.error.invalid.licenseKey': 'Clé de licence invalide pour ce plugin',
    'modal.error.incompatible.licenseKey': 'Clé de licence invalide pour cette version du plugin',
    'modal.error.registered': 'Clé de licence déjà enregistrée',
    'activate': 'Activer',
    'activated': 'Plugin activé',
  },
}
