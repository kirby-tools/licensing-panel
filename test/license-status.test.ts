import type { PluginContext } from '../src/context'
import { describe, expect, it } from 'vitest'
import { useLicenseStatus } from '../src/license-status'
import { stubPanel } from './helpers'

const LICENSE_DIALOG = 'johannschopplich-kirby-seo-audit/activate'

describe('useLicenseStatus', () => {
  it('reads licenseStatus and licenseDialog from the context', async () => {
    stubPanel()
    const context = Promise.resolve<PluginContext>({ licenseStatus: 'inactive', licenseDialog: LICENSE_DIALOG })
    const { licenseStatus, licenseDialog } = useLicenseStatus({ pluginId: 'seo-audit', resolveContext: () => context })

    await context

    expect(licenseStatus.value).toBe('inactive')
    expect(licenseDialog.value).toBe(LICENSE_DIALOG)
  })

  it('keeps licenseStatus active when an inactive context resolves after kirby-tools.license.activate.seo-audit', async () => {
    const panel = stubPanel()
    const { promise, resolve } = Promise.withResolvers<PluginContext>()
    const { licenseStatus } = useLicenseStatus({ pluginId: 'seo-audit', resolveContext: () => promise })

    panel.events.emit('kirby-tools.license.activate.seo-audit')
    resolve({ licenseStatus: 'inactive', licenseDialog: LICENSE_DIALOG })
    await promise

    expect(licenseStatus.value).toBe('active')
  })
})
