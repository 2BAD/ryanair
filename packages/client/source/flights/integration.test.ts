import { describe, expect, it, vi } from 'vitest'
// biome-ignore lint/style/noNamespaceImport: useful for spying
import * as client from '~/client/index.ts'
import { BOOKING_API, FARE_FINDER_API } from '~/endpoints.ts'
import { tomorrow } from '~/helpers/date.ts'
import { flights } from '~/index.ts'

const from = 'LON' // all London airports
const to = 'MIL' // all Milan airports

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

      await expect(flights.getDates(from, to)).rejects.toThrow('Response code 400 (Bad Request)')
    })
  })

  describe('getAvailable', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const options = {
        // biome-ignore lint/style/useNamingConvention: remote api props
        ADT: '5',
        // biome-ignore lint/style/useNamingConvention: remote api props
        CHD: '2',
        // biome-ignore lint/style/useNamingConvention: remote api props
        DateIn: '',
        // biome-ignore lint/style/useNamingConvention: remote api props
        DateOut: tomorrow(),
        // biome-ignore lint/style/useNamingConvention: remote api props
        Destination: 'BER',
        // biome-ignore lint/style/useNamingConvention: remote api props
        Disc: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysBeforeIn: '3',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysBeforeOut: '3',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysIn: '3',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysOut: '3',
        // biome-ignore lint/style/useNamingConvention: remote api props
        IncludeConnectingFlights: 'true',
        // biome-ignore lint/style/useNamingConvention: remote api props
        INF: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        Origin: 'KRK',
        promoCode: 'PROMO',
        // biome-ignore lint/style/useNamingConvention: remote api props
        RoundTrip: 'true',
        // biome-ignore lint/style/useNamingConvention: remote api props
        TEEN: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        ToUs: 'AGREED'
      }
      const urlParams = new URLSearchParams(options)

      await flights.getAvailable(options)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })

    it('when provided single parameter \n\t Then should fallback to defaults', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      // biome-ignore lint/style/useNamingConvention: remote api props
      const options = { ADT: '1' }
      const defaults = {
        // biome-ignore lint/style/useNamingConvention: remote api props
        ADT: '1',
        // biome-ignore lint/style/useNamingConvention: remote api props
        CHD: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        DateIn: '',
        // biome-ignore lint/style/useNamingConvention: remote api props
        DateOut: tomorrow(),
        // biome-ignore lint/style/useNamingConvention: remote api props
        Destination: 'KRK',
        // biome-ignore lint/style/useNamingConvention: remote api props
        Disc: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysBeforeIn: '2',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysBeforeOut: '2',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysIn: '2',
        // biome-ignore lint/style/useNamingConvention: remote api props
        FlexDaysOut: '2',
        // biome-ignore lint/style/useNamingConvention: remote api props
        IncludeConnectingFlights: 'false',
        // biome-ignore lint/style/useNamingConvention: remote api props
        INF: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        Origin: 'BER',
        promoCode: '',
        // biome-ignore lint/style/useNamingConvention: remote api props
        RoundTrip: 'false',
        // biome-ignore lint/style/useNamingConvention: remote api props
        TEEN: '0',
        // biome-ignore lint/style/useNamingConvention: remote api props
        ToUs: 'AGREED'
      }
      const urlParams = new URLSearchParams({ ...defaults, ...options })

      await flights.getAvailable(options)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })

    it('when provided asked for a valid destination \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const options = {
        // biome-ignore lint/style/useNamingConvention: remote api props
        ADT: '1',
        // biome-ignore lint/style/useNamingConvention: remote api props
        DateOut: tomorrow()
      }
      await flights.getAvailable(options)

      const data = await flights.getAvailable(options)
      expect(data.trips[0]?.dates.length).toBeGreaterThan(0)
    })
  })
})
