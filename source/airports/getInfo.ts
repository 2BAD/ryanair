import { Airport, type IataCode } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { VIEWS_API } from '~/endpoints.ts'

/**
 * Returns information about an airport
 *
 * @param code - The IATA code of the airport
 */
export const getInfo = async (code: IataCode): Promise<Airport> => {
  const url = `${VIEWS_API}/5/airports/en/${code}`
  const data = await get(url)
  const airport = Airport.parse(data)
  return airport
}
