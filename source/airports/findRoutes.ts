import { z } from 'zod'
import * as airports from '~/airports/index.ts'
import { IataCode, type Destination } from './types.ts'

/**
 * Retrieves IATA codes from an array of destinations.
 *
 * @param destinations - An array of Destination objects.
 */
const getIataCodes = (destinations: Destination[]): Set<IataCode> => {
  return new Set(destinations.map((airport) => airport.arrivalAirport.code))
}

/**
 * Finds available routes between two airports.
 *
 * @param from - The departure airport IATA code.
 * @param to - The arrival airport IATA code.
 */
export const findRoutes = async (from: IataCode, to: IataCode): Promise<IataCode[][]> => {
  const [departureDestinations, arrivalDestinations] = await Promise.all([
    airports.getDestinations(from),
    airports.getDestinations(to)
  ])

  const departureConnectionsCodes = getIataCodes(departureDestinations)
  const arrivalConnectionsCodes = getIataCodes(arrivalDestinations)

  if (departureConnectionsCodes.has(to)) return [[from, to]]

  let matchingCodes = [...departureConnectionsCodes].filter((code) => arrivalConnectionsCodes.has(code))
  matchingCodes = z.array(IataCode).parse(matchingCodes)
  const routes = matchingCodes.map((code) => [from, code, to])
  return routes
}
