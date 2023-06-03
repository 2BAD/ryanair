import { z } from 'zod'
import { get } from '~/client.ts'
import { AirportConnection } from '~/airports/types.ts'

/**
 * Search for airports with available routes from the departure phrase to the arrival phrase
 *
 * @param to The landing location to use when looking up routes. This can be an airport name, city, or country.
 * @param from The starting location to use when looking up routes. This can be an airport name, city, or country.
 * @param locale The locale to use when looking up routes
 */

export const searchByRoute = async (from: string, to = '', locale = 'en-gb'): Promise<AirportConnection[]> => {
  const url = `https://www.ryanair.com/api/locate/v1/autocomplete/routes?departurePhrase=${from}&arrivalPhrase=${to}&market=${locale}`
  const data = await get(url)
  const airports = z.array(AirportConnection).parse(data)
  return airports
}
