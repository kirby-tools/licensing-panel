# @kirby-tools/licensing

Internal shared library for the license buttons and plugin context of commercial Kirby Tools plugins within the Kirby Panel.

## Overview

Version 1 targets Kirby 6 and Vue 3; Kirby 5 plugins stay on `^0.9`. Activation itself belongs to [`johannschopplich/kirby-tools-licensing`](https://github.com/kirby-tools/licensing-backend): its PHP dialog takes the email and license key, and its translations hold every string the buttons show. This package provides:

- **UI components**: `LicensingButtonGroup` and `LicensingDropdownItems`, which show the buttons a license status calls for and open the backend's activation dialog
- **Integrity check**: `useLicense().assertActivationIntegrity()` reports buttons that are hidden or shrunk away
- **Backend strings**: `useLicense().backendT()` reads the backend's `kirby-tools.license.*` strings with English fallbacks
- **Plugin context**: `createPluginContext()` caches a plugin's context route and registers its `assets`
- **Dialog license status**: `useLicenseStatus()` reads the license status from the plugin context for a dialog's buttons
- **License toast**: `showLicenseToastOnce()` asks an unlicensed user once per session to activate a license
- **License props**: `licenseProps` declares the `licenseStatus` and `licenseDialog` props

## Usage

### License Buttons

```vue
<script setup lang="ts">
import { licenseProps } from '@kirby-tools/licensing'
import { LicensingButtonGroup } from '@kirby-tools/licensing/components'

// `licenseStatus` and `licenseDialog` come from the field's or view's PHP class; see the licensing backend's README.
defineProps(licenseProps)
</script>

<template>
  <LicensingButtonGroup
    :dialog="licenseDialog"
    :license-status="licenseStatus"
    pricing-url="https://kirby.tools/copilot/buy"
  />
</template>
```

After a successful activation, the backend dialog reloads the current view, which hands a field or view its new status.

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

### Dialogs

A dialog has no field props to read the status from. Kirby reopens it from its history after the activation dialog, with the status it had before, so `useLicenseStatus()` switches its status to `active` on the activation event:

```ts
import { useLicenseStatus } from '@kirby-tools/licensing'

const { licenseStatus, licenseDialog } = useLicenseStatus({
  pluginId: 'copilot',
  resolveContext: usePluginContext,
})
```

Both refs start out `undefined`, so the template guards the buttons with `v-if="licenseStatus && licenseDialog"`.

### License Toast

```ts
import { showLicenseToastOnce } from '@kirby-tools/licensing'
import { usePanel } from 'kirbyuse'

showLicenseToastOnce({
  storageKey: 'kirby$copilot$acceptedSuggestionCount',
  threshold: 3,
  resolveContext: usePluginContext,
  message: usePanel().t('johannschopplich.copilot.licenseToast'),
})
```

Each call counts up under `storageKey` in `sessionStorage`. The call that reaches `threshold` shows the toast if the license is `inactive` or `invalid`, and later calls in the session do nothing. On a local development host, calls neither count nor show anything.

## License

[AGPL](./LICENSE) License © 2024-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
