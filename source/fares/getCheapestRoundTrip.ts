import fastCartesian from 'fast-cartesian'
import { type IataCode } from '~/airports/types.ts'
import { type StrDate } from '~/date.types.ts'
import { getDailyFaresInRange } from '~/fares/index.ts'
import { type Fare, type RoundTrip } from '~/fares/types.ts'
import { isAfterISO } from '~/utils/date.ts'

const getFarePrice = (f: Fare): number => (f.price !== null ? f.price.value : 0)
const sortByPrice = (a: Fare, b: Fare): number => getFarePrice(a) - getFarePrice(b)

/**
 * Finds the cheapest round trip fares for a given route and date range in a specific currency
 *
 * @param from The IATA code of the origin airport
 * @param to The IATA code of the destination airport
 * @param startDate - The start date of the search range, in yyyy-mm-dd format
 * @param endDate - The end date of the search range, in yyyy-mm-dd format
 * @param currency The currency to use for pricing (default: 'EUR')
 * @param limit The maximum number of round trip fares to return (default: 10)
 * @returns An array of objects representing the cheapest round trip fares found
 */

export const getCheapestRoundTrip = async (
  from: IataCode,
  to: IataCode,
  startDate: StrDate,
  endDate: StrDate,
  currency = 'EUR',
  limit = 10
): Promise<RoundTrip[]> => {
  const [outboundPrices, inboundPrices] = await Promise.all([
    getDailyFaresInRange(from, to, startDate, endDate, currency),
    getDailyFaresInRange(to, from, startDate, endDate, currency)
  ])

  const sortedOutboundPrices = outboundPrices.sort(sortByPrice).slice(0, limit)
  const sortedInboundPrices = inboundPrices.sort(sortByPrice).slice(0, limit)

  const combinations = fastCartesian([sortedOutboundPrices, sortedInboundPrices])

  const cheapestRoundTrips = combinations
    .map(([outbound, inbound]) => ({
      departure: outbound,
      return: inbound,
      price: Number((getFarePrice(outbound) + getFarePrice(inbound)).toFixed(2))
    }))
    .filter((trip) => isAfterISO(trip.return.day, trip.departure.day))
    .sort((a, b) => a.price - b.price)
    .slice(0, limit)

  return cheapestRoundTrips
}