/* eslint-disable @stylistic/indent */
import type { BeforeRequestHook, ExtendOptions, InitHook, Options, OptionsInit } from 'got'
import { setTimeout } from 'node:timers/promises'

const crypto = await import('node:crypto')

export type Debounce = {
  debounce?:
    | {
        queue: Promise<void>
        duration: [number, number] | number
      }
    | undefined
}

export type OptionsWithDebounce = {
  context: Debounce & Record<string, unknown>
} & Options

/**
 * Merge the debounce properties into the options instance
 *
 * @param raw - Plain request options, right before their normalization.
 * @param options - The `Got` options object.
 */
const initOptionsHook: InitHook = (raw: Debounce & OptionsInit, options: Options) => {
  if (raw.debounce) {
    options.context['debounce'] = {
      queue: Promise.resolve(),
      duration: raw.debounce
    }
    raw.debounce = undefined
  }
}

/**
 * Debounce hook used as a BeforeRequestHook.
 *
 * @param options - The `Got` options object with debounce properties.
 */
const debounceHook: BeforeRequestHook = async (options: OptionsWithDebounce) => {
  if (!options.context.debounce) return
  const { debounce } = options.context
  const timeout = Array.isArray(debounce.duration) ? crypto.randomInt(...debounce.duration) : debounce.duration
  const previous = debounce.queue
  debounce.queue = (async () => {
    await previous
    await setTimeout(timeout)
  })()
  await debounce.queue
}

export const debounce: ExtendOptions = {
  hooks: {
    init: [initOptionsHook],
    beforeRequest: [debounceHook]
  }
}
