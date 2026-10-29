import type { ComponentObjectPropsOptions, PropType } from 'vue'
import type { LicenseStatus } from './types'

export const licenseProps = {
  licenseStatus: {
    type: String as PropType<LicenseStatus>,
    required: true,
  },
  licenseDialog: {
    type: String,
    required: true,
  },
} as const satisfies ComponentObjectPropsOptions
