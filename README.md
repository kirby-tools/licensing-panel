# @kirby-tools/licensing

Internal shared library for managing licensing and activation of commercial Kirby Tools plugins within the Kirby Panel.

## Overview

This package provides a unified licensing system for all commercial Kirby Tools plugins, handling:

- **License activation**: Dialogs for entering email and license key
- **License status**: Reading whether a license is active, inactive, invalid, incompatible, or upgradeable
- **UI components**: Pre-built Vue components for license buttons and dropdown items
- **Multi-language support**: Translations for English, German, Spanish, French, Italian, and Dutch

## Usage

```ts
import { useLicense } from '@kirby-tools/licensing'

const { openLicenseDialog, assertActivationIntegrity } = useLicense({
  label: 'Plugin Name',
  apiNamespace: 'plugin-namespace'
})
```

## License

[AGPL](./LICENSE) License © 2024-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
