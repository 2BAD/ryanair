import { AirportShort } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { GEOLOCATION_API } from '~/endpoints.ts'

/**
 * Returns information about the closest airport based on the user's IP address
 */
export const getClosest = async (): Promise<AirportShort> => {
  const url = `${GEOLOCATION_API}/defaultAirport`
  const data = await get(url)
  const airport = AirportShort.parse(data)
  return airport
}
