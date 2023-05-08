import { got } from 'got'
import { CookieJar, type Cookie } from 'tough-cookie'

/**
 * Performs a GET request to the specified URL and returns the response data as a promise
 *
 * @param url The URL to send the GET request to
 * @return A promise that resolves with the response data or rejects with an error
 */

// export const get = async (url: string | URL): Promise<unknown> => {

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
          await got('https://www.ryanair.com/de/de', {
            cookieJar: options.cookieJar
          })
        }
      }
    ]
  },
  resolveBodyOnly: true,
  responseType: 'json',
  cookieJar: new CookieJar()
})
