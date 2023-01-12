import { Airport, IataCode } from './types'

/**
 * Returns information about an airport
 *
 * @param code The IATA code of the airport
 */

export const getInfo = async (code: IataCode): Promise<Airport> => {
  const url = `https://www.ryanair.com/api/views/locate/5/airports/en/${code}`
  const res = await fetch(url)
  const airport = Airport.parse(await res.json())
  return airport
}
