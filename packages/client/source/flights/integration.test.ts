import { afterEach, describe, expect, it, vi } from 'vitest'
import * as client from '~/client/index.ts'
import { BOOKING_API, FARE_FINDER_API } from '~/endpoints.ts'
import { nextMonth } from '~/helpers/date.ts'
import { flights } from '~/index.ts'

const from = 'BER'
const to = 'VCE'
const flightDate = nextMonth()

describe('flights', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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
        `Request failed with status code 400 (Bad Request): GET https://www.ryanair.com/api/farfnd/v4/oneWayFares/WRONG_IATA_CODE/${to}/availabilities`
      )
    })
  })

  describe('getAvailable', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get').mockRejectedValue(new Error('short-circuit'))
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

      try {
        await flights.getAvailable(options)
      } catch {
        // short-circuit mock is expected to throw
      }

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })

    it('when provided single parameter \n\t Then should fallback to defaults', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get').mockRejectedValue(new Error('short-circuit'))
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

      try {
        await flights.getAvailable(options)
      } catch {
        // short-circuit mock is expected to throw
      }

      expect(getSpy).toHaveBeenNthCalledWith(1, `${BOOKING_API}/availability?${urlParams.toString()}`)
    })
  })
})
