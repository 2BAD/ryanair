import { axiom } from '@2bad/axiom'
import { defineConfig } from 'oxlint'

export default defineConfig({ extends: [axiom], rules: { 'no-redeclare': 'off' } })
