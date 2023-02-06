import { get } from '../client'
import { Airport, type IataCode } from './types'

/**
 * Returns information about an airport
 *
 * @param code The IATA code of the airport
 */

export const getInfo = async (code: IataCode): Promise<Airport> => {
  const url = `https://www.ryanair.com/api/views/locate/5/airports/en/${code}`
  const data = await get(url)
  const airport = Airport.parse(data)
  return airport
}
