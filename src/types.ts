import type { Ref } from 'vue'

export type MaybeRef<T = any> = T | Ref<T>

export type LicenseKey = string

export interface License {
  licenseKey: LicenseKey
  [key: string]: string
}
