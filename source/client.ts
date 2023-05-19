import { got } from 'got'
import { CookieJar, Cookie } from 'tough-cookie'

/**
 * Extend `got` http client so every time request is made we check if there is a `rid.sig` cookie
 * that is needed for certain endpoints to work
 *
 * @returns A promise that resolves with the response data or rejects with an error
 */

export const get = got.extend({
  hooks: {
    beforeRequest: [
      async (options) => {
        // Check if the `rid.sig` cookie exists
        // @ts-expect-error got is unable to resolve correct type for cookieJar
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const cookies = options.cookieJar?.getCookiesSync(options.url?.toString()) as Cookie[]
        const ridSigCookie = cookies.find((cookie: { key: string }) => cookie.key === 'rid.sig')
        if (typeof ridSigCookie === 'undefined') {
          // If it doesn't exist, visit the Ryanair site to set the cookie

          // @ts-expect-error got is unable to resolve correct type for cookieJar
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          options.cookieJar?.setCookieSync(
            new Cookie({
              key: 'mkt',
              value: '/de/de/',
              domain: 'ryanair.com'
            }),
            'https://www.ryanair.com'
          )
          await got('https://www.ryanair.com/de/de', {
            cookieJar: options.cookieJar
          })
        }
      }
    ]
  },
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:113.0) Gecko/20100101 Firefox/113.0'
  },
  resolveBodyOnly: true,
  responseType: 'json',
  cookieJar: new CookieJar()
})
