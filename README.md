# @kirby-tools/licensing

Internal shared library for the license buttons of commercial Kirby Tools plugins within the Kirby Panel.

## Overview

Version 1 targets Kirby 6 and Vue 3; Kirby 5 plugins stay on `^0.9`. Activation itself belongs to [`johannschopplich/kirby-tools-licensing`](https://github.com/kirby-tools/licensing-backend): its PHP dialog takes the email and license key, and its translations hold every string the buttons show. This package provides:

- **UI components**: `LicensingButtonGroup` and `LicensingDropdownItems`, which show the buttons a license status calls for and open the backend's activation dialog
- **Integrity check**: `useLicense().assertActivationIntegrity()` reports buttons that are hidden or shrunk away
- **Backend strings**: `useLicense().backendT()` reads the backend's `kirby-tools.license.*` strings with English fallbacks

## Usage

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

## License

[AGPL](./LICENSE) License © 2024-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
