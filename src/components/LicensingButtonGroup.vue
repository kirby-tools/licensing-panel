<script setup lang="ts">
import type { ComponentPublicInstance, PropType } from 'vue'
import type { LicenseStatus } from '../types'
import { onMounted, ref } from 'kirbyuse'
import { useLicense } from '../license'
import { t } from '../utils'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  apiNamespace: {
    type: String,
    required: true,
  },
  licenseStatus: {
    type: String as PropType<LicenseStatus>,
    required: true,
  },
  pricingUrl: {
    type: String,
    required: true,
  },
})

const { openLicenseModal, assertActivationIntegrity } = useLicense({
  label: props.label,
  apiNamespace: props.apiNamespace,
})

const currentLicenseStatus = ref(props.licenseStatus)
const licenseButtonGroup = ref<ComponentPublicInstance | undefined>()

onMounted(() => {
  assertActivationIntegrity({
    component: licenseButtonGroup,
    licenseStatus: props.licenseStatus,
  })
})

async function handleRegistration() {
  const { isLicenseActive } = await openLicenseModal()

  if (!isLicenseActive)
    return

  // currentLicenseStatus.value = 'active'

  // Force a reload to refresh the plugin's cached context
  window.location.reload()
}
</script>

<template>
  <k-button-group
    v-if="currentLicenseStatus !== 'active'"
    ref="licenseButtonGroup"
    layout="collapsed"
  >
    <k-button
      theme="love"
      variant="filled"
      size="xs"
      :link="currentLicenseStatus === 'upgradeable' ? 'https://hub.kirby.tools' : pricingUrl"
      target="_blank"
      :text="currentLicenseStatus === 'upgradeable' ? t('upgrade') : t('buy')"
    />
    <k-button
      theme="love"
      variant="filled"
      size="xs"
      icon="key"
      :text="t('activate')"
      @click="handleRegistration()"
    />
  </k-button-group>
</template>
