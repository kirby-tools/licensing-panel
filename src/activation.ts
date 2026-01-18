const LICENSE_ACTIVATED_EVENT = 'kirby-tools:license-activated'

type ActivationCallback = () => void | Promise<void>

const callbacks = new Map<string, ActivationCallback>()
let isListenerAttached = false

function ensureListener() {
  if (isListenerAttached)
    return

  window.addEventListener(LICENSE_ACTIVATED_EVENT, async (event) => {
    const detail = (event as CustomEvent).detail
    const callback = callbacks.get(detail?.apiNamespace)
    if (callback)
      await callback()
  })

  isListenerAttached = true
}

export function dispatchLicenseActivated(apiNamespace: string) {
  window.dispatchEvent(
    new CustomEvent(LICENSE_ACTIVATED_EVENT, {
      detail: { apiNamespace },
    }),
  )
}

export function onLicenseActivated(
  apiNamespace: string,
  callback: ActivationCallback,
) {
  ensureListener()
  callbacks.set(apiNamespace, callback)
}
