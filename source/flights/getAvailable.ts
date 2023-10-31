import { get } from '~/client/index.ts'
import { BOOKING_API } from '~/endpoints.ts'
import { AvailabilityResponse, type AvailabilityOptions } from '~/flights/types.ts'
import { tomorrow } from '~/helpers/date.ts'

/**
 * Returns the list of available flights between two airports based on the provided options. It accepts a partial object of type AvailabilityOptions for specifying the search criteria.
 *
 * @param params - AvailabilityOptions
 * @param params.ADTNumber - Number of adults (default is 1)
 * @param params.CHDNumber - Number of children (default is 0)
 * @param params.DateIn - Date of incoming flight in YYYY-MM-DD format (default is empty string)
 * @param params.DateOut - Date of outgoing flight in YYYY-MM-DD format (default is set to tomorrow)
 * @param params.Destination - IATA code of destination airport (default is set to KRK)
 * @param params.DiscDiscount - Discount amount (default is 0)
 * @param params.INFNumber - Number of infants (default is 0)
 * @param params.Origin - IATA code of the origin airport (default is set to BER)
 * @param params.TEEN - Number of teenagers (default is 0)
 * @param params.promoCode - Promotional code (default is empty string)
 * @param params.IncludeConnectingFlights - Boolean value to include connecting flights (default - is set to false)
 * @param params.FlexDaysBeforeOut - Number of days for outbound flex search before the selected date (default is 2)
 * @param params.FlexDaysOut - Number of days for outbound flex search after the selected date (default is 2)
 * @param params.FlexDaysBeforeIn - Number of days for inbound flex search before the selected date (default is 2)
 * @param params.FlexDaysIn - Number of days for inbound flex search after the selected date (default is 2)
 * @param params.RoundTrip - Boolean value to get return flight (default is set to false)
 * @param params.ToUs - String value indicating acceptance of terms & conditions (default is set to `AGREED`)
 */
export const getAvailable = async (params: Partial<AvailabilityOptions>): Promise<AvailabilityResponse> => {
  const defaults: AvailabilityOptions = {
    ADT: '1',
    CHD: '0',
    DateIn: '',
    DateOut: tomorrow(),
    Destination: 'KRK',
    Disc: '0',
    FlexDaysBeforeIn: '2',
    FlexDaysBeforeOut: '2',
    FlexDaysIn: '2',
    FlexDaysOut: '2',
    IncludeConnectingFlights: 'false',
    INF: '0',
    Origin: 'BER',
    promoCode: '',
    RoundTrip: 'false',
    TEEN: '0',
    ToUs: 'AGREED'
  }

  const urlParams = new URLSearchParams({ ...defaults, ...params })

  const url = `${BOOKING_API}/availability?${urlParams.toString()}`

  const data = await get(url)
  const availabilities = AvailabilityResponse.parse(data)

  return availabilities
}
