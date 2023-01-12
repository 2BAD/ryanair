import { AirportShort } from './types'

/**
 * Returns information about the closest airport based on the user's IP address.
 */

export const getClosest = async (): Promise<AirportShort> => {
  const url = 'https://www.ryanair.com/api/geoloc/v5/defaultAirport'
  const res = await fetch(url)
  const airport = AirportShort.parse(await res.json())
  return airport
}
