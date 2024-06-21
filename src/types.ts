export type LicenseKey = string

export interface License {
  licenseKey: LicenseKey
  [key: string]: string
}
