import { IataCode } from '../airports/types'
import { ListFlightDate } from './types'

/**
 * Returns a list of available flight dates between two airports
 *
 * @param from The IATA code of the departure airport
 * @param to The IATA code of the arrival airport
 */

export const getDates = async (from: IataCode, to: IataCode): Promise<ListFlightDate> => {
  const url = `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${from}/${to}/availabilities`
  const res = await fetch(url)
  const dates = ListFlightDate.parse(await res.json())
  return dates
}
