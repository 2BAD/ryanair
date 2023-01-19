import { z } from 'zod'
import { Airport } from './types'

/**
 * Retrieves a list of all active airports
 */

export const getActive = async (): Promise<Airport[]> => {
  const url = 'https://www.ryanair.com/api/views/locate/5/airports/en/active'
  const res = await fetch(url)
  const airports = z.array(Airport).parse(await res.json())
  return airports
}
