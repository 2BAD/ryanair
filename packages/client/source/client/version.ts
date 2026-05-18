import got from 'got'

const VERSION_DISCOVERY_URL = 'https://www.ryanair.com/ie/en/trip/flights/select'
const VERSION_PATTERN = /Desktop version: (\d+\.\d+\.\d+)/

let current = process.env['RYANAIR_CLIENT_VERSION'] ?? '3.196.0'
let pending: Promise<string | undefined> | undefined

export const getClientVersion = (): string => current

export const refreshClientVersion = (url: string = VERSION_DISCOVERY_URL): Promise<string | undefined> => {
  pending ??= (async () => {
    try {
      const html = await got(url, {
        responseType: 'text',
        resolveBodyOnly: true,
        retry: { limit: 1 }
      })
      const next = html.match(VERSION_PATTERN)?.[1]
      if (next) current = next
      return next
    } catch {
      return undefined
    } finally {
      pending = undefined
    }
  })()
  return pending
}
