import type { LicenseStatus } from '../src/types'
import { mount } from '@vue/test-utils'
import { beforeEach, expect, it } from 'vitest'
import LicensingButtonGroup from '../src/components/LicensingButtonGroup.vue'
import { kirbyComponents, stubPanel } from './helpers'

const DIALOG = 'johannschopplich-kirby-copilot/activate'
const PRICING_URL = 'https://kirby.tools/copilot/buy'

function mountGroup(licenseStatus: LicenseStatus) {
  return mount(LicensingButtonGroup, {
    props: { dialog: DIALOG, licenseStatus, pricingUrl: PRICING_URL },
    global: { components: kirbyComponents },
  })
}

beforeEach(() => {
  stubPanel()
})

it('renders nothing for an active license', () => {
  expect(mountGroup('active').find('button').exists()).toBe(false)
})

it.each(['inactive', 'upgradeable'] as const)('offers a purchase link and the activation dialog for an %s license', (status) => {
  const buttons = mountGroup(status).findAll('button')

  expect(buttons).toHaveLength(2)
  expect(buttons[0]!.attributes('link')).toBe(status === 'upgradeable' ? 'https://hub.kirby.tools' : PRICING_URL)
  expect(buttons[0]!.attributes('text')).toBe(status === 'upgradeable' ? 'Upgrade' : 'Buy a license')
  expect(buttons[1]!.attributes('dialog')).toBe(DIALOG)
  expect(buttons[1]!.attributes('text')).toBe('Activate')
})

it('reopens the activation dialog for an invalid license', () => {
  const buttons = mountGroup('invalid').findAll('button')

  expect(buttons).toHaveLength(1)
  expect(buttons[0]!.attributes('dialog')).toBe(DIALOG)
  expect(buttons[0]!.attributes('text')).toBe('Invalid license')
})

it('links an incompatible license to the hub', () => {
  const buttons = mountGroup('incompatible').findAll('button')

  expect(buttons).toHaveLength(1)
  expect(buttons[0]!.attributes('link')).toBe('https://hub.kirby.tools')
  expect(buttons[0]!.attributes('dialog')).toBeUndefined()
})

it('follows a license status that changes after mount', async () => {
  const wrapper = mountGroup('inactive')
  expect(wrapper.findAll('button')).toHaveLength(2)

  await wrapper.setProps({ licenseStatus: 'active' })

  expect(wrapper.find('button').exists()).toBe(false)
})
