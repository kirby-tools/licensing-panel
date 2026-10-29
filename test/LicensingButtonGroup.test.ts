import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import LicensingButtonGroup from '../src/components/LicensingButtonGroup.vue'
import { kirbyComponents, stubPanel } from './helpers'

const DIALOG = 'johannschopplich-kirby-copilot/activate'

it('follows a license status that changes after mount', async () => {
  stubPanel()
  const wrapper = mount(LicensingButtonGroup, {
    props: { dialog: DIALOG, licenseStatus: 'inactive', pricingUrl: 'https://kirby.tools/copilot/buy' },
    global: { components: kirbyComponents },
  })
  expect(wrapper.find('[icon="key"]').attributes('dialog')).toBe(DIALOG)

  await wrapper.setProps({ licenseStatus: 'active' })

  expect(wrapper.find('button').exists()).toBe(false)
})
