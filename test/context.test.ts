import { resolvePluginAsset } from 'kirbyuse'
import { describe, expect, it, vi } from 'vitest'
import { createPluginContext } from '../src/context'
import { stubPanel } from './helpers'

const ROUTE = '__copilot__/context'

function contextResponse(licenseStatus: 'active' | 'inactive', assets?: { filename: string, url: string }[]) {
  return { licenseStatus, licenseDialog: 'johannschopplich-kirby-copilot/activate', assets }
}

describe('createPluginContext', () => {
  it('fetches the context again after kirby-tools.license.activate.copilot during the first request', async () => {
    // Plugins evaluate before the Panel exists: `window.panel` is still Kirby's stub without `events`.
    vi.stubGlobal('panel', { plugins: {} })
    const usePluginContext = createPluginContext({ route: ROUTE, pluginId: 'copilot' })
    const panel = stubPanel()
    const { promise: firstResponse, resolve } = Promise.withResolvers<ReturnType<typeof contextResponse>>()
    panel.api.get
      .mockReturnValueOnce(firstResponse)
      .mockResolvedValueOnce(contextResponse('active'))

    const firstContext = usePluginContext()
    panel.events.emit('kirby-tools.license.activate.copilot')
    resolve(contextResponse('inactive'))
    await firstContext

    expect((await usePluginContext()).licenseStatus).toBe('active')
  })

  it('registers the assets of the response', async () => {
    const panel = stubPanel()
    panel.api.get.mockResolvedValue(contextResponse('active', [{ filename: 'pdf.js', url: '/media/pdf.js' }]))

    await createPluginContext({ route: ROUTE, pluginId: 'copilot' })()

    expect(resolvePluginAsset('pdf.js').url).toBe('/media/pdf.js')
  })
})
