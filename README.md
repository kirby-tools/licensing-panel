# @kirby-tools/licensing

Internal shared library for managing licensing and activation of commercial Kirby Tools plugins within the Kirby Panel.

## Overview

This package provides a unified licensing system for all commercial Kirby Tools plugins, handling:

- **License activation**: Modal dialogs for entering email and order ID
- **License validation**: Checking license status (active, inactive, invalid, incompatible, upgradeable)
- **UI components**: Pre-built Vue components for license buttons and dropdown items
- **Multi-language support**: Translations for English, German, French, and Dutch
- **Local development**: Automatic detection of local environments to bypass licensing

## Usage

```ts
import { useLicense } from '@kirby-tools/licensing'

const { openLicenseModal, assertActivationIntegrity } = useLicense({
  label: 'Plugin Name',
  apiNamespace: 'plugin-namespace'
})
```

## License

[AGPL](./LICENSE) License © 2024-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
