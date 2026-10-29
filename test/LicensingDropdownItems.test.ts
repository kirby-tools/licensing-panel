import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import LicensingDropdownItems from '../src/components/LicensingDropdownItems.vue'
import { kirbyComponents, stubPanel } from './helpers'

const DIALOG = 'johannschopplich-kirby-content-translator/activate'

it('follows a license status that changes after mount', async () => {
  stubPanel()
  const wrapper = mount(LicensingDropdownItems, {
    props: { dialog: DIALOG, licenseStatus: 'inactive', pricingUrl: 'https://kirby.tools/content-translator/buy' },
    global: { components: kirbyComponents },
  })
  expect(wrapper.find('[icon="key"]').attributes('dialog')).toBe(DIALOG)

  await wrapper.setProps({ licenseStatus: 'active' })

  expect(wrapper.find('button').exists()).toBe(false)
})
