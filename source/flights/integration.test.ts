import * as client from '~/client/index.ts'
import { getAvailable, getDates } from '~/flights/index.ts'
import { tomorrow } from '~/helpers/date.ts'

describe('flights', () => {
  describe('getDates', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const from = 'BER' // Berlin airport
      const to = 'KRK' // Krakow airport

      await getDates(from, to)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${from}/${to}/availabilities`
      )
    })

    it('when provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)
      const from = 'BER' // Berlin airport
      const to = 'KRK' // Krakow airport

      const data = await getDates(from, to)
      expect(data.length).toBeGreaterThan(0)
    })

    it('when asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      const from = 'WRONG_IATA_CODE'
      const to = 'KRK' // Krakow airport

      await expect(getDates(from, to)).rejects.toThrow('Response code 400 (Bad Request)')
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

      await getAvailable(options)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/booking/v4/en-gb/availability?${urlParams.toString()}`
      )
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

      await getAvailable(options)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/booking/v4/en-gb/availability?${urlParams.toString()}`
      )
    })

    it('when provided asked for a valid destination \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)
      const options = {
        ADT: '1',
        DateOut: tomorrow()
      }
      await getAvailable(options)

      const data = await getAvailable(options)
      expect(data.trips[0]?.dates.length).toBeGreaterThan(0)
    })
  })
})
