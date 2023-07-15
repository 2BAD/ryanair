import { get } from '~/client.ts'
import { AvailabilityResponse, type AvailabilityOptions } from '~/flights/types.ts'
import { tomorrow } from '~/helpers/date.ts'

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

  const url = `https://www.ryanair.com/api/booking/v4/en-gb/availability?${urlParams.toString()}`

  const data = await get(url)
  const availabilities = AvailabilityResponse.parse(data)

  return availabilities
}
