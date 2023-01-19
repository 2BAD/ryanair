/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * Performs a GET request to the specified URL and returns the response data as a promise
 *
 * @param url The URL to send the GET request to
 * @return A promise that resolves with the response data or rejects with an error
 */

export const get = async (url: string | URL): Promise<unknown> => {
  return await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
      }
      const data = response.json()
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}
