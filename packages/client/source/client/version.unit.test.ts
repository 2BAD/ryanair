import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { getClientVersion, refreshClientVersion } from '~/client/version.ts'

type StubResponse = { status: number; body: string }

describe('client-version discovery', () => {
  let server: Server
  let url: string
  let queue: StubResponse[] = []
  let hits = 0

  beforeAll(async () => {
    server = createServer((_req, res) => {
      hits++
      const next = queue.shift() ?? { status: 500, body: 'unprepared' }
      res.writeHead(next.status, { 'content-type': 'text/html', connection: 'close' })
      res.end(next.body)
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    const addr = server.address() as AddressInfo
    url = `http://127.0.0.1:${addr.port}/`
  })

  afterAll(
    () =>
      new Promise<void>((resolve) => {
        server.closeAllConnections?.()
        server.close(() => resolve())
      })
  )

  beforeEach(() => {
    queue = []
    hits = 0
  })

  it('parses the Desktop version comment and persists it', async () => {
    queue.push({
      status: 200,
      body: '<html><!-- Desktop version: 9.9.9 --><!-- Mobile version: 8.8.8 --></html>'
    })

    expect(await refreshClientVersion(url)).toBe('9.9.9')
    expect(getClientVersion()).toBe('9.9.9')
    expect(hits).toBe(1)
  })

  it('ignores Mobile version', async () => {
    queue.push({ status: 200, body: '<html><!-- Mobile version: 1.2.3 --></html>' })
    expect(await refreshClientVersion(url)).toBeUndefined()
  })

  it('returns undefined when the comment is absent', async () => {
    queue.push({ status: 200, body: '<html>no version here</html>' })
    expect(await refreshClientVersion(url)).toBeUndefined()
  })

  it('returns undefined on http error (after one retry)', async () => {
    queue.push({ status: 500, body: '' })
    queue.push({ status: 500, body: '' })
    expect(await refreshClientVersion(url)).toBeUndefined()
    expect(hits).toBe(2)
  })

  it('dedupes concurrent calls into a single request', async () => {
    queue.push({ status: 200, body: '<!-- Desktop version: 1.2.3 -->' })

    const results = await Promise.all([refreshClientVersion(url), refreshClientVersion(url), refreshClientVersion(url)])

    expect(results).toEqual(['1.2.3', '1.2.3', '1.2.3'])
    expect(hits).toBe(1)
  })

  it('clears the dedup cache after settling so the next call re-fetches', async () => {
    queue.push({ status: 200, body: '<!-- Desktop version: 4.5.6 -->' })
    await refreshClientVersion(url)

    queue.push({ status: 200, body: '<!-- Desktop version: 7.8.9 -->' })
    expect(await refreshClientVersion(url)).toBe('7.8.9')
    expect(hits).toBe(2)
  })
})
