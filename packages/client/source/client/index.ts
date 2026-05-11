import { randomUUID } from 'node:crypto'
import got, { type Agents, type Got } from 'got'
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent'
import { debounce } from '~/client/hooks/debounce.ts'

export const DELAY_MS: number | [number, number] = 500

// Booking API gates on a `fr-correlation-id` cookie (presence only, value unchecked)
// and a `client-version` header that must match a currently-deployed Ryanair web
// client version. Override the version via `RYANAIR_CLIENT_VERSION` when the default
// gets retired from their whitelist; symptom is `409 Availability declined`.
const CLIENT_VERSION = process.env['RYANAIR_CLIENT_VERSION'] ?? '3.196.0'

/**
 * Create proxy agents if proxy environment variables are set
 */
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

export const get: Got = got.extend({
  headers: {
    'user-agent': 'Mozilla/5.0 (compatible; @2bad/ryanair; +https://github.com/2BAD/ryanair)',
    'client-version': CLIENT_VERSION,
    cookie: `fr-correlation-id=${randomUUID()}`
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
  agent: createProxyAgents(),
  ...debounce(DELAY_MS)
})
