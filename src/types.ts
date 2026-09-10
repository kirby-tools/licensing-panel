import type { Ref } from 'vue'

export type MaybeRef<T = any> = T | Ref<T>

export type LicenseKey = string
export type LicenseStatus = 'active' | 'inactive' | 'invalid' | 'incompatible' | 'upgradeable'
