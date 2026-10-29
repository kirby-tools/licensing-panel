import type { PluginAsset } from 'kirbyuse'
import type { LicenseStatus } from './types'
import { createSharedRequest, registerPluginAssets, usePanel } from 'kirbyuse'

export interface PluginContext {
  licenseStatus: LicenseStatus
  licenseDialog: string
  assets?: PluginAsset[]
}

export function createPluginContext<T extends PluginContext>({ route, pluginId }: {
  route: string
  pluginId: string
}): () => Promise<T> {
  let isSubscribed = false

  const request = createSharedRequest(async () => {
    const panel = usePanel()

    // Subscribes on the first call, since a plugin creates its context while `window.panel`
    // is still Kirby's stub without `events`.
    if (!isSubscribed) {
      panel.events.on(`kirby-tools.license.activate.${pluginId}`, request.clear)
      isSubscribed = true
    }

    // Silent, so the request doesn't show the Panel's loading indicator.
    const context = await panel.api.get<T>(route, undefined, undefined, true)

    if (context.assets)
      registerPluginAssets(context.assets)

    return context
  })

  return request.get
}
