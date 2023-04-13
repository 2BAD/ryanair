import { get } from '../client'
import { type AvailabilityOptions, AvailabilityResponse } from './types'

export const getAvailable = async (
  params: Partial<AvailabilityOptions>
): Promise<AvailabilityResponse> => {
  const defaults: AvailabilityOptions = {
    ADT: '1',
    CHD: '0',
    DateIn: '',
    DateOut: '2023-01-24',
    Destination: 'BRU',
    Disc: '0',
    INF: '0',
    Origin: 'BER',
    TEEN: '0',
    promoCode: '',
    IncludeConnectingFlights: 'false',
    FlexDaysBeforeOut: '2',
    FlexDaysOut: '2',
    FlexDaysBeforeIn: '2',
    FlexDaysIn: '2',
    RoundTrip: 'false',
    ToUs: 'AGREED'
  }

  const urlParams = new URLSearchParams({ ...defaults, ...params })

  const url = `https://www.ryanair.com/api/booking/v4/en-gb/availability?${urlParams.toString()}`

  const data = await get(url)
  const availabilities = AvailabilityResponse.parse(data)

  return availabilities
}
