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

const { openLicenseDialog, assertActivationIntegrity, backendT } = useLicense({
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

async function handleActivation() {
  await openLicenseDialog()
}
</script>

<template>
  <k-button-group
    v-if="currentLicenseStatus !== 'active'"
    ref="licenseButtonGroup"
    layout="collapsed"
  >
    <!-- Mirrors the System view: an invalid key gets re-entered, an incompatible one upgraded -->
    <k-button
      v-if="currentLicenseStatus === 'invalid'"
      theme="negative"
      variant="filled"
      size="xs"
      icon="alert"
      :text="backendT('status.invalid')"
      @click="handleActivation()"
    />
    <k-button
      v-else-if="currentLicenseStatus === 'incompatible'"
      theme="negative"
      variant="filled"
      size="xs"
      icon="alert"
      link="https://hub.kirby.tools"
      target="_blank"
      :text="backendT('info.upgrade')"
      :title="backendT('status.incompatible')"
    />
    <template v-else>
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
        @click="handleActivation()"
      />
    </template>
  </k-button-group>
</template>
