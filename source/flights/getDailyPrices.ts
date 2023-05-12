import { type IataCode } from '~/airports/types'
import { type StrDate } from '~/date.types'
import { cheapestPerDay } from '~/fares'
import { type DailyPrice } from '~/flights/types'
import { getFirstDayOfEachMonthInRange } from '~/utils/date'

/**
 * Retrieve daily prices for a given origin and destination airport, within a specified date range.
 *
 * @param from - The IATA code for the origin airport.
 * @param to - The IATA code for the destination airport.
 * @param startDate - The start date of the search range, in yyyy-mm-dd format.
 * @param endDate - The end date of the search range, in yyyy-mm-dd format.
 * @param currency - The currency code to use for pricing data (default is EUR).
 */
export const getDailyPrices = async (
  from: IataCode,
  to: IataCode,
  startDate: StrDate,
  endDate: StrDate,
  currency = 'EUR'
): Promise<DailyPrice[]> => {
  const months = getFirstDayOfEachMonthInRange(startDate, endDate)
  const requests = months.map((month) => cheapestPerDay(from, to, month, currency))
  const result = await Promise.all(requests)
  return result.flatMap(({ outbound: { fares } }) =>
    fares.map(({ day, price }) => ({ day, price })).filter(({ price }) => price !== null)
  )
}