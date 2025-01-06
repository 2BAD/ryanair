/* eslint-disable import-x/no-default-export */
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: allow default export for vitest config
export default defineConfig({
  test: {
    exclude: ['build', 'node_modules'],
    coverage: {
      exclude: ['build', ...coverageConfigDefaults.exclude],
      provider: 'v8'
    },
    testTimeout: 30000
  },
  plugins: [tsconfigPaths()]
})
