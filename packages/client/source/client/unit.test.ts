import { performance } from 'node:perf_hooks'
import { describe, expect, it } from 'vitest'
import { DELAY_MS, get } from '~/client/index.ts'
import { TIMETABLE_API } from '~/endpoints.ts'

describe('http client', () => {
  it('debounce concurrent requests', async () => {
    expect.assertions(1)

    const endpoint = `${TIMETABLE_API}/schedules/period`
    const requests = Array.from({ length: 10 }, () => get(endpoint))

    const startedAt = performance.now()
    await Promise.all(requests)
    const elapsedTime = performance.now() - startedAt

    const totalDelay = Array.isArray(DELAY_MS) ? Math.min(...DELAY_MS) : DELAY_MS * requests.length
    expect(elapsedTime).toBeGreaterThan(totalDelay)
  })
})
