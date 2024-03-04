import { z } from 'zod'
import { Airport, AirportV3 } from '~/airports/types.ts'
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

/**
 * Retrieves a list of all active airports using api v3 (old)
 */
export const getActiveV3 = async (): Promise<AirportV3[]> => {
  const url = `${VIEWS_API}/3/airports/en/active`
  const data = await get(url)
  const airports = z.array(AirportV3).parse(data)
  return airports
}
