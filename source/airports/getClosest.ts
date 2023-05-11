import { get } from '~/client'
import { AirportShort } from '~/airports/types'

/**
 * Returns information about the closest airport based on the user's IP address.
 */

export const getClosest = async (): Promise<AirportShort> => {
  const url = 'https://www.ryanair.com/api/geoloc/v5/defaultAirport'
  const data = await get(url)
  const airport = AirportShort.parse(data)
  return airport
}
