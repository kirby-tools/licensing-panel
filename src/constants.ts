export type MessageValue = string
export type Messages = Record<string, MessageValue>

export const TRANSLATIONS: Record<string, Messages> = {
  en: {
    'modal.info': 'Thanks for purchasing {label}! Please enter your email address and order ID to activate your license.',
    'modal.help.orderId': '<a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Get your order number</a> from Lemon Squeezy or <a href="mailto:hello@kirby.tools">contact us</a> if you cannot find it.',
    'activate': 'Activate',
    'activated': 'Plugin activated',
  },
  de: {
    'modal.info': 'Dankeschön für den Kauf von {label}! Bitte gib deine E-Mail-Adresse und Bestellnummer ein, um deine Lizenz zu aktivieren.',
    'modal.help.orderId': 'Rufe die <a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Bestellnummer von Lemon Squeezy ab</a> oder <a href="mailto:hello@kirby.tools">kontaktiere uns</a>, wenn du sie nicht finden kannst.',
    'activate': 'Aktivieren',
    'activated': 'Plugin aktiviert',
  },
  fr: {
    'modal.info': 'Merci d\'avoir acheté {label} ! Veuillez saisir votre adresse e-mail et votre numéro de commande pour activer votre licence.',
    'modal.help.orderId': 'Obtenez votre numéro de commande sur <a href="https://app.lemonsqueezy.com/my-orders" target="_blank">Lemon Squeezy</a> ou <a href="mailto:hello@kirby.tools">contactez-nous</a> si vous ne le trouvez pas.',
    'activate': 'Activer',
    'activated': 'Plugin activé',
  },
}
