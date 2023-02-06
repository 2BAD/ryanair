import { z } from 'zod'
import { get } from '../client'
import { Destination, type IataCode } from './types'

/**
 * Returns a list of available destinations from an airport
 *
 * @param code The IATA code of the airport
 */

export const getDestinations = async (code: IataCode): Promise<Destination[]> => {
  const url = `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${code}`
  const data = await get(url)
  const destinations = z.array(Destination).parse(data)
  return destinations
}
