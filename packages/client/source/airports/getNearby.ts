import { z } from 'zod'
import { AirportShort } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { GEOLOCATION_API } from '~/endpoints.ts'

/**
 * Retrieves a list of all nearby airports
 *
 * @param locale - A valid IETF language tag (default: 'en-gb')
 */
export const getNearby = async (locale = 'en-gb'): Promise<AirportShort[]> => {
  const url = `${GEOLOCATION_API}/nearbyAirports?market=${locale}`

  const data = await get(url)
  const airports = z.array(AirportShort).parse(data)
  return airports
}
