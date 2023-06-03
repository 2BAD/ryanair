import { z } from 'zod'
import { get } from '~/client.ts'
import { Airport } from '~/airports/types.ts'

/**
 * Retrieves a list of all active airports
 */

export const getActive = async (): Promise<Airport[]> => {
  const url = 'https://www.ryanair.com/api/views/locate/5/airports/en/active'
  const data = await get(url)
  const airports = z.array(Airport).parse(data)
  return airports
}
