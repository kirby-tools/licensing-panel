import type { PluginContext } from './context'
import type { LicenseStatus } from './types'
import { usePanelEvent } from 'kirbyuse'
import { ref } from 'vue'

export function useLicenseStatus({ pluginId, resolveContext }: {
  pluginId: string
  resolveContext: () => Promise<PluginContext>
}) {
  const licenseStatus = ref<LicenseStatus>()
  const licenseDialog = ref<string>()

  resolveContext().then((context) => {
    // An activation while the request is in flight outranks the status the request returns.
    licenseStatus.value ??= context.licenseStatus
    licenseDialog.value = context.licenseDialog
  })

  // Kirby reopens a dialog from its history after the activation dialog, with the status it had before.
  usePanelEvent(`kirby-tools.license.activate.${pluginId}`, () => {
    licenseStatus.value = 'active'
  })

  return { licenseStatus, licenseDialog }
}
