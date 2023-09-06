import { performance } from 'node:perf_hooks'
import { DELAY_MS, get } from '~/client/index.ts'

describe('http client', () => {
  it('debounce concurrent requests', async () => {
    const API_ENDPOINT = 'https://www.ryanair.com/api/timtbl/3/schedules/period'
    const requests = Array.from({ length: 10 }, () => get(API_ENDPOINT))

    const startedAt = performance.now()
    await Promise.all(requests)
    const elapsedTime = performance.now() - startedAt

    // eslint-disable-next-line vitest/no-conditional-tests, vitest/no-conditional-in-test
    const totalDelay = Array.isArray(DELAY_MS) ? Math.min(...DELAY_MS) : DELAY_MS * requests.length
    expect(elapsedTime).toBeGreaterThan(totalDelay)
  })
})
