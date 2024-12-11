import type { Ref } from 'vue'

export type MaybeRef<T = any> = T | Ref<T>

export type LicenseKey = string
export type LicenseStatus = 'active' | 'inactive' | 'invalid' | 'incompatible' | 'upgradeable'

export interface License {
  key: LicenseKey
  version: number
  compatibility: string
}
