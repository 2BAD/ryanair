import { randomUUID } from 'node:crypto'
import got, { type Agents, type Got } from 'got'
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent'
import { debounce } from '~/client/hooks/debounce.ts'

export const DELAY_MS: number | [number, number] = 500

// Booking API gates on a `fr-correlation-id` cookie (presence only, value unchecked)
// and a `client-version` header. The version must match the currently-deployed
// Ryanair web client exactly, not a min-version check. Retired pins return
// `409 Availability declined`.
//
// On 409 from an availability call the client scrapes the live version from the
// flight-select page HTML (`<!-- Desktop version: X.Y.Z -->`), updates the
// in-memory pin, and retries once. `RYANAIR_CLIENT_VERSION` skips both the
// default pin and discovery on the first call.
const VERSION_DISCOVERY_URL = 'https://www.ryanair.com/ie/en/trip/flights/select'
const VERSION_PATTERN = /Desktop version: (\d+\.\d+\.\d+)/

let clientVersion = process.env['RYANAIR_CLIENT_VERSION'] ?? '3.196.0'
let pendingDiscovery: Promise<string | undefined> | undefined

const discoverClientVersion = (): Promise<string | undefined> => {
  pendingDiscovery ??= got(VERSION_DISCOVERY_URL, {
    responseType: 'text',
    resolveBodyOnly: true,
    retry: { limit: 1 }
  })
    .then((html) => html.match(VERSION_PATTERN)?.[1])
    .catch(() => undefined)
    .finally(() => {
      pendingDiscovery = undefined
    })
  return pendingDiscovery
}

const isAvailabilityCall = (url: string): boolean =>
  url.includes('/api/booking/v4/') && url.includes('/availability')

const createProxyAgents = (): Agents => {
  const httpProxy = process.env['HTTP_PROXY']
  const httpsProxy = process.env['HTTPS_PROXY']

  if (httpProxy || httpsProxy) {
    return {
      http: httpProxy ? new HttpProxyAgent({ proxy: httpProxy }) : false,
      https: httpsProxy ? new HttpsProxyAgent({ proxy: httpsProxy }) : false
    }
  }

  return {}
}

export const get: Got = got.extend(
  {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; @2bad/ryanair; +https://github.com/2BAD/ryanair)',
      cookie: `fr-correlation-id=${randomUUID()}`
    },
    hooks: {
      beforeRequest: [
        (options) => {
          options.headers['client-version'] = clientVersion
        }
      ],
      afterResponse: [
        async (response, retryWithMergedOptions) => {
          if (response.statusCode !== 409) return response
          if (!isAvailabilityCall(response.url)) return response
          const ctx = response.request.options.context as { versionRetried?: boolean }
          if (ctx.versionRetried) return response
          const next = await discoverClientVersion()
          if (!next) return response
          clientVersion = next
          return retryWithMergedOptions({ context: { versionRetried: true } })
        }
      ]
    },
    resolveBodyOnly: true,
    responseType: 'json',
    strictContentLength: false,
    retry: {
      limit: 3,
      methods: ['GET'],
      statusCodes: [408, 429, 500, 502, 503, 504],
      backoffLimit: 5000
    },
    agent: createProxyAgents()
  },
  debounce(DELAY_MS)
)
