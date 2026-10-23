import type { LicenseStatus } from '../src/types'
import { mount } from '@vue/test-utils'
import { beforeEach, expect, it } from 'vitest'
import LicensingDropdownItems from '../src/components/LicensingDropdownItems.vue'
import { kirbyComponents, stubPanel } from './helpers'

const DIALOG = 'johannschopplich-kirby-content-translator/activate'

function mountItems(licenseStatus: LicenseStatus) {
  return mount(LicensingDropdownItems, {
    props: { dialog: DIALOG, licenseStatus, pricingUrl: 'https://kirby.tools/content-translator/buy' },
    global: { components: kirbyComponents },
  })
}

beforeEach(() => {
  stubPanel()
})

it('renders nothing for an active license', () => {
  expect(mountItems('active').find('button').exists()).toBe(false)
})

it('opens the activation dialog from the activate item', () => {
  const items = mountItems('inactive').findAll('button')

  expect(items[1]!.attributes('dialog')).toBe(DIALOG)
  expect(items[1]!.text()).toBe('Activate')
})

it('follows a license status that changes after mount', async () => {
  const wrapper = mountItems('invalid')
  expect(wrapper.find('button').attributes('dialog')).toBe(DIALOG)

  await wrapper.setProps({ licenseStatus: 'active' })

  expect(wrapper.find('button').exists()).toBe(false)
})
