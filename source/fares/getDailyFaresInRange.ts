import { type IataCode } from '~/airports/types'
import { type StrDate } from '~/date.types'
import { getCheapestPerDay } from '~/fares'
import { type Fare } from '~/fares/types'
import { getFirstDayOfEachMonthInRange } from '~/utils/date'

/**
 * Retrieve daily fares for a given origin and destination airport, within a specified date range.
 *
 * @param from - The IATA code for the origin airport.
 * @param to - The IATA code for the destination airport.
 * @param startDate - The start date of the search range, in yyyy-mm-dd format.
 * @param endDate - The end date of the search range, in yyyy-mm-dd format.
 * @param currency - The currency code to use for pricing data (default is EUR).
 */

export const getDailyFaresInRange = async (
  from: IataCode,
  to: IataCode,
  startDate: StrDate,
  endDate: StrDate,
  currency = 'EUR'
): Promise<Fare[]> => {
  const months = getFirstDayOfEachMonthInRange(startDate, endDate)
  const requests = months.map((month) => getCheapestPerDay(from, to, month, currency))
  const result = await Promise.all(requests)
  return result.flatMap(({ outbound: { fares } }) => fares.filter(({ price }) => price !== null))
}
