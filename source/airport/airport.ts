import { AirportShort, Airport, Destinations, IataCode, ListAirportShort } from './airport.type'

/**
 * Returns information about an airport
 *
 * @param code The IATA code of the airport
 */
export const getAirportInfo = async (code: IataCode): Promise<Airport> => {
  const url = `https://www.ryanair.com/api/views/locate/5/airports/en/${code}`
  const res = await fetch(url)
  const airport = Airport.parse(await res.json())
  return airport
}

/**
 * Returns information about the closest airport based on the user's IP address.
 */
export const getClosestAirport = async (): Promise<AirportShort> => {
  const url = 'https://www.ryanair.com/api/geoloc/v5/defaultAirport'
  const res = await fetch(url)
  const airport = AirportShort.parse(await res.json())
  return airport
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

/**
 * Search for airports matching the given phrase
 *
 * @param phrase The search phrase to use when looking up airports
 * @param locale The locale to use when looking up airports
 */
export const search = async (phrase: string, locale = 'en-gb'): Promise<ListAirportShort> => {
  const url = `https://www.ryanair.com/api/locate/v1/autocomplete/airports?market=${locale}&phrase=${phrase}`
  const res = await fetch(url)
  const airports = ListAirportShort.parse(await res.json())
  return airports
}
