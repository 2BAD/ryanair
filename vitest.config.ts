import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: ['build'],
    coverage: {
      provider: 'c8'
    }
  }
})
