# @kirby-tools/licensing

Internal shared library for the license buttons and plugin context of commercial Kirby Tools plugins within the Kirby Panel.

## Overview

Version 1 targets Kirby 6 and Vue 3; Kirby 5 plugins stay on `^0.9`. Activation itself belongs to [`johannschopplich/kirby-tools-licensing`](https://github.com/kirby-tools/licensing-backend): its PHP dialog takes the email and license key, and its translations hold every string the buttons show. This package provides:

- **UI components**: `LicensingButtonGroup` and `LicensingDropdownItems`, which show the buttons a license status calls for and open the backend's activation dialog
- **Integrity check**: `useLicense().assertActivationIntegrity()` reports buttons that are hidden or shrunk away
- **Backend strings**: `useLicense().backendT()` reads the backend's `kirby-tools.license.*` strings with English fallbacks
- **Plugin context**: `createPluginContext()` fetches a plugin's context route once, registers the `assets` it returns, and fetches again after an activation

## Usage

### License Buttons

```vue
<script setup lang="ts">
import type { LicenseStatus } from '@kirby-tools/licensing'
import { LicensingButtonGroup } from '@kirby-tools/licensing/components'

// Both come from the field's PHP class, see the licensing backend's README
defineProps<{ licenseDialog: string, licenseStatus: LicenseStatus }>()
</script>

<template>
  <LicensingButtonGroup
    :dialog="licenseDialog"
    :license-status="licenseStatus"
    pricing-url="https://kirby.tools/copilot/buy"
  />
</template>
```

The buttons read `licenseStatus` on every render. After a successful activation, the backend dialog reloads the current view, which hands a field its new status. A component that outlives the reload listens for `kirby-tools.license.activate.{pluginId}` on `panel.events`.

### Plugin Context

```ts
import type { PluginContext } from '@kirby-tools/licensing'
import { createPluginContext } from '@kirby-tools/licensing'

interface PluginContextResponse extends PluginContext {
  config: PluginConfig
}

export const usePluginContext = createPluginContext<PluginContextResponse>({
  route: '__copilot__/context',
  pluginId: 'copilot',
})

const { config, licenseStatus } = await usePluginContext()
```

Every call shares one request until an activation clears it, and a failed one is retried on the next call. The context route answers with the license status and the activation dialog; `assets`, if present, are registered for kirbyuse's `resolvePluginAsset()` and `loadPluginModule()`.

## License

[AGPL](./LICENSE) License © 2024-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
