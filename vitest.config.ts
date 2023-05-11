import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: ['build', 'node_modules'],
    coverage: {
      provider: 'c8'
    },
    testTimeout: 30000
  },
  resolve: {
    alias: {
      '~': './source'
    }
  }
})
