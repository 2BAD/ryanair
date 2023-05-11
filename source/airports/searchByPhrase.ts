import { z } from 'zod'
import { get } from '~/client'
import { AirportShort } from '~/airports/types'

/**
 * Search for airports matching the given phrase
 *
 * @param phrase The search phrase to use when looking up airports
 * @param locale The locale to use when looking up airports
 */

export const searchByPhrase = async (phrase: string, locale = 'en-gb'): Promise<AirportShort[]> => {
  const url = `https://www.ryanair.com/api/locate/v1/autocomplete/airports?market=${locale}&phrase=${phrase}`
  const data = await get(url)
  const airports = z.array(AirportShort).parse(data)
  return airports
}
