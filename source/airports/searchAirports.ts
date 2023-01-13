import { ListAirportShort } from './types'

/**
 * Search for airports matching the given phrase
 *
 * @param phrase The search phrase to use when looking up airports
 * @param locale The locale to use when looking up airports
 */

export const searchAirports = async (
  phrase: string,
  locale = 'en-gb'
): Promise<ListAirportShort> => {
  const url = `https://www.ryanair.com/api/locate/v1/autocomplete/airports?market=${locale}&phrase=${phrase}`
  const res = await fetch(url)
  const airports = ListAirportShort.parse(await res.json())
  return airports
}
