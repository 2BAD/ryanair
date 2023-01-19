import { z } from 'zod'
import { Destination, IataCode } from './types'

/**
 * Returns a list of available destinations from an airport
 *
 * @param code The IATA code of the airport
 */

export const getDestinations = async (code: IataCode): Promise<Destination[]> => {
  const url = `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${code}`
  const res = await fetch(url)
  const destinations = z.array(Destination).parse(await res.json())
  return destinations
}
