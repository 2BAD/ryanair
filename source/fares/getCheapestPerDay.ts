import { type IataCode } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { type StrDate } from '~/date.types.ts'
import { CheapestFares } from '~/fares/types.ts'

/**
 * Returns the cheapest one-way fares between two airports for a given month
 *
 * @param from - The IATA code of the departure airport
 * @param to - The IATA code of the arrival airport
 * @param startDate - The start date for the search in the format "YYYY-MM-DD"
 * @param currency - The currency to use for the fares
 */

export const getCheapestPerDay = async (
  from: IataCode,
  to: IataCode,
  startDate: StrDate,
  currency = 'EUR'
): Promise<CheapestFares> => {
  const url = `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${startDate}&currency=${currency}`
  const data = await get(url)
  const fares = CheapestFares.parse(data)
  return fares
}
