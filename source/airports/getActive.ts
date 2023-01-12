import { ListAirport } from './types'

/**
 * Retrieves a list of all active airports
 */

export const getActive = async (): Promise<ListAirport> => {
  const url = 'https://www.ryanair.com/api/views/locate/5/airports/en/active'
  const res = await fetch(url)
  const airports = ListAirport.parse(await res.json())
  return airports
}
