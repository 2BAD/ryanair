import { describe, expect, it, vi } from 'vitest'
import * as client from '~/client/index.ts'
import { BOOKING_API, FARE_FINDER_API } from '~/endpoints.ts'
import { tomorrow } from '~/helpers/date.ts'
import { airports, flights } from '~/index.ts'

const from = 'BER'
const destinations = await airports.getDestinations(from)
const to = destinations[0]?.arrivalAirport.code || 'MXP'
const dates = await flights.getDates(from, to)
const flightDate = dates[0] || tomorrow()

describe('flights', () => {
  describe('getDates', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')

      await flights.getDates(from, to)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${FARE_FINDER_API}/oneWayFares/${from}/${to}/availabilities`)
    })

    it('when provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await flights.getDates(from, to)
      expect(data.length).toBeGreaterThan(0)
    })

    it('when asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)

      const from = 'WRONG_IATA_CODE'

      await expect(flights.getDates(from, to)).rejects.toThrow(
        'Request failed with status code 400 (Bad Request): GET https://www.ryanair.com/api/farfnd/v4/oneWayFares/WRONG_IATA_CODE/ACE/availabilities'
      )
    })
  })

  describe('getAvailable', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const options = {
        ADT: '5',
        CHD: '2',
        DateIn: '',
        DateOut: flightDate,
        Destination: to,
        Disc: '0',
        FlexDaysBeforeIn: '3',
        FlexDaysBeforeOut: '3',
        FlexDaysIn: '3',
        FlexDaysOut: '3',
        IncludeConnectingFlights: 'true',
        INF: '0',
        Origin: from,
        promoCode: 'PROMO',
        RoundTrip: 'true',
        TEEN: '0',
        ToUs: 'AGREED'
      }
      const urlParams = new URLSearchParams(options)

      await flights.getAvailable(options)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })

    it('when provided single parameter \n\t Then should fallback to defaults', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const options = { ADT: '1', DateOut: flightDate, Origin: from, Destination: to }
      const defaults = {
        ADT: '1',
        CHD: '0',
        DateIn: '',
        DateOut: flightDate,
        Destination: to,
        Disc: '0',
        FlexDaysBeforeIn: '2',
        FlexDaysBeforeOut: '2',
        FlexDaysIn: '2',
        FlexDaysOut: '2',
        IncludeConnectingFlights: 'false',
        INF: '0',
        Origin: from,
        promoCode: '',
        RoundTrip: 'false',
        TEEN: '0',
        ToUs: 'AGREED'
      }
      const urlParams = new URLSearchParams({ ...defaults, ...options })

      await flights.getAvailable(options)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })

    it('when provided with a valid destination \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const options = {
        ADT: '1',
        DateOut: flightDate
      }
      await flights.getAvailable(options)

      const data = await flights.getAvailable(options)
      expect(data.trips[0]?.dates.length).toBeGreaterThan(0)
    })
  })
})
