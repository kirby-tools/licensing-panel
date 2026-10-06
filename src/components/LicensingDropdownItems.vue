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

const { openLicenseDialog, backendT } = useLicense({
  label: props.label,
  apiNamespace: props.apiNamespace,
})

const currentLicenseStatus = ref(props.licenseStatus)

async function handleActivation() {
  await openLicenseDialog()
}
</script>

<template>
  <div v-if="currentLicenseStatus !== 'active'">
    <!-- Mirrors the System view: an invalid key gets re-entered, an incompatible one upgraded -->
    <k-dropdown-item
      v-if="currentLicenseStatus === 'invalid'"
      icon="alert"
      @click="handleActivation()"
    >
      {{ backendT('status.invalid') }}
    </k-dropdown-item>
    <k-dropdown-item
      v-else-if="currentLicenseStatus === 'incompatible'"
      icon="alert"
      link="https://hub.kirby.tools"
      target="_blank"
    >
      {{ backendT('status.incompatible') }}
    </k-dropdown-item>
    <template v-else>
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
    </template>
  </div>
</template>
