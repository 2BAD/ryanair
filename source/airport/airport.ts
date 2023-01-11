import { AirportShort, Airport, Destinations, IataCode } from './airport.type'

/**
 * Returns information about an airport
 *
 * @param code The IATA code of the airport
 */
export const getAirportInfo = async (code: IataCode): Promise<Airport> => {
  const url = `https://www.ryanair.com/api/views/locate/5/airports/en/${code}`
  const res = await fetch(url)
  const info = Airport.parse(await res.json())
  return info
}

/**
 * Returns information about the closest airport based on the user's IP address.
 */
export const getClosestAirport = async (): Promise<AirportShort> => {
  const url = 'https://www.ryanair.com/api/geoloc/v5/defaultAirport'
  const res = await fetch(url)
  const info = AirportShort.parse(await res.json())
  return info
}

/**
 * Returns a list of available destinations from an airport
 *
 * @param code The IATA code of the airport
 */
export const getAirportDestinations = async (code: IataCode): Promise<Destinations> => {
  const url = `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${code}`
  const res = await fetch(url)
  const destinations = Destinations.parse(await res.json())
  return destinations
}
