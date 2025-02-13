import { z } from 'zod'
import type { IataCode } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { StrDate } from '~/date.types.ts'
import { FARE_FINDER_API } from '~/endpoints.ts'

/**
 * Returns a list of available flight dates between two airports
 *
 * @param from - The IATA code of the departure airport
 * @param to - The IATA code of the arrival airport
 */
export const getDates = async (from: IataCode, to: IataCode): Promise<StrDate[]> => {
  const url = `${FARE_FINDER_API}/oneWayFares/${from}/${to}/availabilities`
  const data = await get(url)
  const dates = z.array(StrDate).parse(data)
  return dates
}
