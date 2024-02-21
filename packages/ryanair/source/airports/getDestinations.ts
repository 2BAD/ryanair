import { z } from 'zod'
import { Destination, type IataCode } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { VIEWS_API } from '~/endpoints.ts'

/**
 * Returns a list of available destinations from an airport
 *
 * @param code - The IATA code of the airport
 */
export const getDestinations = async (code: IataCode): Promise<Destination[]> => {
  const url = `${VIEWS_API}/searchWidget/routes/en/airport/${code}`
  const data = await get(url)
  const destinations = z.array(Destination).parse(data)
  return destinations
}
