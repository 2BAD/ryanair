import { type Agents, got } from 'got'
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent'
import { debounce } from '~/client/hooks/debounce.ts'

export const DELAY_MS: number | [number, number] = 500

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

/**
 * Extend `got` http client so every time request is made there is a `rid.sig` cookie
 * that is needed for certain endpoints to work
 *
 * @returns A promise that resolves with the response data or rejects with an error
 */

export const get = got.extend({
  headers: {
    client: 'desktop',
    cookie:
      'fr-correlation-id=510176ee-3585-4b17-9bcc-a2dba963cb16; rid=167bf904-3ee1-497b-9bd4-2e4416cf2145; rid.sig=RrjjHNquuQZkrfRiOnO9aCGeAnjLsMy3s6531/IPqU6a/CKaRWXjzARlMYE4iCiWdPA/+isg34kP7bjS45qKI/gPDLqNSJXTzZ1bRR4Oqj+xyWQ16gsHVzyQ2ch2vvayIRv4x5VM6iUMCUp3vIdFeXSUdjMc+dPt3QEgeojLqQlmjSGIB7aW2qEogx6rUujq13TVjh6GRp66G/FfDMIVTEbvyK9C19r7qujUptGjzslAUigUdvoCwLRqNmAFj8M76grc3g/MGAT5/dV4tpPr8eYX5/Lb/y9MdLfCWhlSK9qWayhHQmVAlNIeuXNNmLmeLIMllhslSHGGyl5w/yi2EX9nHULYBoqkG75O8d7/m1+wZven97H0JjuK4uRwac4ubzTsY8Mr6UShaVIcwCYrDQ==; xid=d3772090-c923-4c81-89c5-697279c6d1ad;'
  },
  resolveBodyOnly: true,
  responseType: 'json',
  agent: createProxyAgents(),
  ...debounce(DELAY_MS)
})
