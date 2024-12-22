import type { BeforeRequestHook, ExtendOptions, Options } from 'got'
import { randomInt } from 'node:crypto'
import { setTimeout } from 'node:timers/promises'

export type DebounceOptions = {
  /**
   * Time to wait between requests in milliseconds
   * Can be a fixed number or a range [min, max] for random delays
   */
  duration: number | [number, number]
}

let globalQueue = Promise.resolve()

/**
 * Creates a delay between API requests using a global queue
 *
 * @param duration - Fixed delay in ms or [min, max] range for random delay
 */
const debounceRequest = async (duration: number | [number, number]): Promise<void> => {
  const timeout = Array.isArray(duration) ? randomInt(...duration) : duration

  const previous = globalQueue

  globalQueue = (async () => {
    await previous
    await setTimeout(timeout)
  })()

  await globalQueue
}

/**
 * Hook that runs before each request to enforce delay between API calls
 *
 * @param options - Got request options containing debounce configuration
 */
const beforeRequestHook: BeforeRequestHook = async (options: Options): Promise<void> => {
  const debounceOpts = options.context['debounce'] as DebounceOptions | undefined

  if (!debounceOpts?.duration) {
    return
  }

  await debounceRequest(debounceOpts.duration)
}

/**
 * Creates a Got extension that adds request debouncing functionality
 *
 * @param duration - Fixed delay in ms or [min, max] range for random delay
 */
export const debounce = (duration: number | [number, number]): ExtendOptions => ({
  hooks: {
    beforeRequest: [beforeRequestHook]
  },
  context: {
    debounce: { duration }
  }
})
