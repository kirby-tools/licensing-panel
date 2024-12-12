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
  const { isRegistered } = await openLicenseModal()
  if (isRegistered) {
    currentLicenseStatus.value = 'active'
  }
}
</script>

<template>
  <k-button-group
    v-if="currentLicenseStatus !== 'active'"
    ref="licenseButtonGroup"
    layout="collapsed"
  >
    <k-button
      v-if="currentLicenseStatus === 'upgradeable'"
      theme="notice"
      variant="filled"
      size="xs"
      link="https://hub.kirby.tools"
      target="_blank"
      :text="t('upgrade')"
    />
    <k-button
      v-else
      theme="love"
      variant="filled"
      size="xs"
      :link="pricingUrl"
      target="_blank"
      :text="t('buy')"
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
