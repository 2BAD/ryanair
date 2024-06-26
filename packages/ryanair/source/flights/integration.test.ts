import { describe, expect, it, vi } from 'vitest'
import * as client from '~/client/index.ts'
import { BOOKING_API, FARE_FINDER_API } from '~/endpoints.ts'
import { tomorrow } from '~/helpers/date.ts'
import { flights } from '~/index.ts'

describe('flights', () => {
  describe('getDates', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const from = 'BER' // Berlin airport
      const to = 'KRK' // Krakow airport

      await flights.getDates(from, to)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${FARE_FINDER_API}/oneWayFares/${from}/${to}/availabilities`)
    })

    it('when provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const from = 'BER' // Berlin airport
      const to = 'KRK' // Krakow airport

      const data = await flights.getDates(from, to)
      expect(data.length).toBeGreaterThan(0)
    })

    it('when asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)

      const from = 'WRONG_IATA_CODE'
      const to = 'KRK' // Krakow airport

      await expect(flights.getDates(from, to)).rejects.toThrow('Response code 400 (Bad Request)')
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
        DateOut: tomorrow(),
        Destination: 'BER',
        Disc: '0',
        FlexDaysBeforeIn: '3',
        FlexDaysBeforeOut: '3',
        FlexDaysIn: '3',
        FlexDaysOut: '3',
        IncludeConnectingFlights: 'true',
        INF: '0',
        Origin: 'KRK',
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
      const options = { ADT: '1' }
      const defaults = {
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
      const urlParams = new URLSearchParams({ ...defaults, ...options })

      await flights.getAvailable(options)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })

    it('when provided asked for a valid destination \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const options = {
        ADT: '1',
        DateOut: tomorrow()
      }
      await flights.getAvailable(options)

      const data = await flights.getAvailable(options)
      expect(data.trips[0]?.dates.length).toBeGreaterThan(0)
    })
  })
})
