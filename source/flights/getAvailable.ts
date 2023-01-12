import { AvailabilityOptions, AvailabilityResponse } from './types'

export const getAvailable = async (
  params: Partial<AvailabilityOptions>
): Promise<AvailabilityResponse> => {
  const url = new URL('https://www.ryanair.com/api/booking/v4/en-gb/availability')
  const defaultOptions: AvailabilityOptions = {
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

  const options = { ...defaultOptions, ...params }

  Object.entries(options).forEach(([k, v]) => {
    url.searchParams.append(k, v)
  })

  const res = await fetch(url)
  const availabilities = AvailabilityResponse.parse(await res.json())

  return availabilities
}
