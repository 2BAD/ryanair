import { z } from 'zod'
import { AirportShort } from './types'

/**
 * Search for airports matching the given phrase
 *
 * @param phrase The search phrase to use when looking up airports
 * @param locale The locale to use when looking up airports
 */

export const searchAirports = async (phrase: string, locale = 'en-gb'): Promise<AirportShort[]> => {
  const url = `https://www.ryanair.com/api/locate/v1/autocomplete/airports?market=${locale}&phrase=${phrase}`
  const res = await fetch(url)
  const airports = z.array(AirportShort).parse(await res.json())
  return airports
}
