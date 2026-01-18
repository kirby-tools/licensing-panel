import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

const VUE_COMPONENTS = ['LicensingButtonGroup.vue', 'LicensingDropdownItems.vue']

export default defineConfig({
  entry: 'src/index.ts',
  dts: true,
  platform: 'neutral',
  hooks: {
    'build:done': async () => {
      const componentsDir = 'dist/components'
      await mkdir(componentsDir, { recursive: true })

      for (const component of VUE_COMPONENTS) {
        await copyFile(`src/components/${component}`, `${componentsDir}/${component}`)
      }

      const indexContent = `
export { default as LicensingButtonGroup } from "./LicensingButtonGroup.vue";
export { default as LicensingDropdownItems } from "./LicensingDropdownItems.vue";
`.trimStart()

      await writeFile(`${componentsDir}/index.js`, indexContent)
      await writeFile(`${componentsDir}/index.d.ts`, indexContent)
    },
  },
})
