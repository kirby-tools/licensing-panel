import type { LicenseStatus } from '../src/types'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { showLicenseToastOnce } from '../src/toast'
import { stubPanel } from './helpers'

const STORAGE_KEY = 'kirby$copilot$acceptedSuggestionCount'

function toastAfterTwoCalls(licenseStatus: LicenseStatus) {
  return showLicenseToastOnce({
    storageKey: STORAGE_KEY,
    threshold: 2,
    resolveContext: async () => ({ licenseStatus }),
    message: 'Get a license',
  })
}

describe('showLicenseToastOnce', () => {
  let panel: ReturnType<typeof stubPanel>

  beforeEach(() => {
    panel = stubPanel()
    sessionStorage.clear()
    // `isLocalDev()` skips the toast on the test runner's localhost.
    vi.stubGlobal('location', new URL('https://example.com/panel'))
  })

  it.each(['inactive', 'invalid'] as const)('shows the toast for an %s license once the threshold is reached, and never again', async (licenseStatus) => {
    await toastAfterTwoCalls(licenseStatus)
    expect(panel.notification.info).not.toHaveBeenCalled()

    await toastAfterTwoCalls(licenseStatus)
    expect(panel.notification.info).toHaveBeenCalledTimes(1)

    // Runs to twice the threshold, so a counter that restarts after the toast would show it again.
    await toastAfterTwoCalls(licenseStatus)
    await toastAfterTwoCalls(licenseStatus)
    expect(panel.notification.info).toHaveBeenCalledTimes(1)
  })

  it('shows one toast for concurrent calls at the threshold', async () => {
    await toastAfterTwoCalls('inactive')
    await Promise.all([toastAfterTwoCalls('inactive'), toastAfterTwoCalls('inactive')])

    expect(panel.notification.info).toHaveBeenCalledTimes(1)
  })

  it('skips the toast for an active license', async () => {
    await toastAfterTwoCalls('active')
    await toastAfterTwoCalls('active')

    expect(panel.notification.info).not.toHaveBeenCalled()
  })
})
