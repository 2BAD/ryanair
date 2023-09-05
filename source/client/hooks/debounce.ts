import { type BeforeRequestHook, type ExtendOptions, type InitHook, type Options, type OptionsInit } from 'got'
import { setTimeout } from 'node:timers/promises'

const crypto = await import('node:crypto')

export type Debounce = {
  debounce?: {
    queue: Promise<void>
    duration: [number, number] | number
  }
}

export type OptionsWithDebounce = {
  context: Debounce & Record<string, unknown>
} & Options

const initOptionsHook: InitHook = (raw: Debounce & OptionsInit, options: Options) => {
  if (raw.debounce) {
    options.context['debounce'] = {
      queue: Promise.resolve(),
      duration: raw.debounce
    }
    delete raw.debounce
  }
}

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
