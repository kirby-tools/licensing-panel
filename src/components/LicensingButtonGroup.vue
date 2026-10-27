<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { LicenseStatus } from '../types'
import { onMounted, useTemplateRef } from 'vue'
import { useLicense } from '../license'

const props = defineProps<{
  /** The `{vendor}-{package}/activate` dialog the licensing backend registers. */
  dialog: string
  licenseStatus: LicenseStatus
  pricingUrl: string
}>()

const { assertActivationIntegrity, backendT } = useLicense()

const licenseButtonGroup = useTemplateRef<ComponentPublicInstance>('licenseButtonGroup')

onMounted(() => {
  assertActivationIntegrity({
    component: licenseButtonGroup,
    licenseStatus: props.licenseStatus,
  })
})
</script>

<template>
  <k-button-group
    v-if="licenseStatus !== 'active'"
    ref="licenseButtonGroup"
    layout="collapsed"
  >
    <!-- Mirrors the System view: an invalid key gets re-entered, an incompatible one upgraded -->
    <k-button
      v-if="licenseStatus === 'invalid'"
      theme="negative"
      variant="filled"
      size="xs"
      icon="alert"
      :dialog="dialog"
      :text="backendT('status.invalid')"
    />
    <k-button
      v-else-if="licenseStatus === 'incompatible'"
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
        :link="licenseStatus === 'upgradeable' ? 'https://hub.kirby.tools' : pricingUrl"
        target="_blank"
        :text="licenseStatus === 'upgradeable' ? backendT('button.upgrade') : backendT('button.buy')"
      />
      <k-button
        theme="love"
        variant="filled"
        size="xs"
        icon="key"
        :dialog="dialog"
        :text="backendT('button.activate')"
      />
    </template>
  </k-button-group>
</template>
