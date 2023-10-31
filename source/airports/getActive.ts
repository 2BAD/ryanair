import { z } from 'zod'
import { Airport } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { VIEWS_API } from '~/endpoints.ts'

/**
 * Retrieves a list of all active airports
 */
export const getActive = async (): Promise<Airport[]> => {
  const url = `${VIEWS_API}/5/airports/en/active`
  const data = await get(url)
  const airports = z.array(Airport).parse(data)
  return airports
}
