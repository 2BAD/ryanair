import { randomUUID } from 'node:crypto'
import got, { type Agents, type Got } from 'got'
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent'
import { debounce } from '~/client/hooks/debounce.ts'
import { getClientVersion, refreshClientVersion } from '~/client/version.ts'

export const DELAY_MS: number | [number, number] = 500

// Booking API gates on a `fr-correlation-id` cookie (presence only, value unchecked)
// and a `client-version` header. The version must match the currently-deployed
// Ryanair web client exactly, not a min-version check. Retired pins return
// `409 Availability declined`. On 409 the client refreshes the version from the
// flight-select page and retries once. See `version.ts`.

const isAvailabilityCall = (url: string): boolean => url.includes('/api/booking/v4/') && url.includes('/availability')

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
          options.headers['client-version'] = getClientVersion()
        }
      ],
      afterResponse: [
        async (response, retryWithMergedOptions) => {
          if (response.statusCode !== 409) return response
          if (!isAvailabilityCall(response.url)) return response
          const ctx = response.request.options.context as { versionRetried?: boolean }
          if (ctx.versionRetried) return response
          const next = await refreshClientVersion()
          if (!next) return response
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
