import type { ComponentPublicInstance } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { INTEGRITY_ERROR } from '../src/constants'
import { useLicense } from '../src/license'
import { stubPanel } from './helpers'

function componentWith(element: HTMLElement, size = { width: 120, height: 24 }) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(DOMRect.fromRect(size))
  document.body.append(element)

  return { $el: element } as ComponentPublicInstance
}

describe('assertActivationIntegrity', () => {
  let panel: ReturnType<typeof stubPanel>

  beforeEach(() => {
    panel = stubPanel()
    document.body.innerHTML = ''
  })

  it('accepts visible buttons', () => {
    const { assertActivationIntegrity } = useLicense()

    assertActivationIntegrity({ component: componentWith(document.createElement('div')), licenseStatus: 'inactive' })

    expect(panel.notification.error).not.toHaveBeenCalled()
  })

  it('reports buttons hidden with `display: none`', () => {
    const { assertActivationIntegrity } = useLicense()
    const element = document.createElement('div')
    element.style.display = 'none'

    assertActivationIntegrity({ component: componentWith(element), licenseStatus: 'inactive' })

    expect(panel.notification.error).toHaveBeenCalledWith(INTEGRITY_ERROR)
  })

  it('reports buttons shrunk to a zero-size box', () => {
    const { assertActivationIntegrity } = useLicense()

    assertActivationIntegrity({
      component: componentWith(document.createElement('div'), { width: 0, height: 24 }),
      licenseStatus: 'inactive',
    })

    expect(panel.notification.error).toHaveBeenCalledWith(INTEGRITY_ERROR)
  })

  it('skips the check for an active license', () => {
    const { assertActivationIntegrity } = useLicense()

    assertActivationIntegrity({ component: undefined, licenseStatus: 'active' })

    expect(panel.notification.error).not.toHaveBeenCalled()
  })
})
