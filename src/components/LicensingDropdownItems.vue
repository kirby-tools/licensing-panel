<script setup lang="ts">
import type { PropType } from 'vue'
import type { LicenseStatus } from '../types'
import { ref } from 'kirbyuse'
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

const { openLicenseModal } = useLicense({
  label: props.label,
  apiNamespace: props.apiNamespace,
})

const currentLicenseStatus = ref(props.licenseStatus)

async function handleActivation() {
  await openLicenseModal()
}
</script>

<template>
  <div v-if="currentLicenseStatus !== 'active'">
    <k-dropdown-item
      icon="cart"
      :link="currentLicenseStatus === 'upgradeable' ? 'https://hub.kirby.tools' : pricingUrl"
      target="_blank"
    >
      {{ currentLicenseStatus === 'upgradeable' ? t('upgrade') : t('buy') }}
    </k-dropdown-item>
    <k-dropdown-item
      icon="key"
      @click="handleActivation()"
    >
      {{ t('activate') }}
    </k-dropdown-item>
  </div>
</template>
