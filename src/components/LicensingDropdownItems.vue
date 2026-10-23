<script setup lang="ts">
import type { LicenseStatus } from '../types'
import { useLicense } from '../license'

defineProps<{
  /** The `{vendor}-{package}/activate` dialog the licensing backend registers */
  dialog: string
  licenseStatus: LicenseStatus
  pricingUrl: string
}>()

const { backendT } = useLicense()
</script>

<template>
  <div v-if="licenseStatus !== 'active'">
    <!-- Mirrors the System view: an invalid key gets re-entered, an incompatible one upgraded -->
    <k-dropdown-item
      v-if="licenseStatus === 'invalid'"
      icon="alert"
      :dialog="dialog"
    >
      {{ backendT('status.invalid') }}
    </k-dropdown-item>
    <k-dropdown-item
      v-else-if="licenseStatus === 'incompatible'"
      icon="alert"
      link="https://hub.kirby.tools"
      target="_blank"
    >
      {{ backendT('status.incompatible') }}
    </k-dropdown-item>
    <template v-else>
      <k-dropdown-item
        icon="cart"
        :link="licenseStatus === 'upgradeable' ? 'https://hub.kirby.tools' : pricingUrl"
        target="_blank"
      >
        {{ licenseStatus === 'upgradeable' ? backendT('button.upgrade') : backendT('button.buy') }}
      </k-dropdown-item>
      <k-dropdown-item
        icon="key"
        :dialog="dialog"
      >
        {{ backendT('button.activate') }}
      </k-dropdown-item>
    </template>
  </div>
</template>
