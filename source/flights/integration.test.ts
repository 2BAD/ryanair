import * as client from '../client'
import { tomorrow } from '../utils/date'
import { getDates, getAvailable } from './index'

describe('Flights', () => {
  describe('getDates', () => {
    it('When provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const from = 'DUB' // Dublin airport
      const to = 'LTN' // London Luton airport

      await getDates(from, to)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${from}/${to}/availabilities`
      )
    })

    it('When provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)
      const from = 'DUB' // Dublin airport
      const to = 'LTN' // London Luton airport

      const data = await getDates(from, to)
      expect(data.length).toBeGreaterThan(0)
    })

    it('throws an error if invalid IATA code is provided', async () => {
      expect.assertions(1)
      const from = 'WRONG_IATA_CODE'
      const to = 'LTN' // London Luton airport

      await expect(getDates(from, to)).rejects.toThrow('HTTP Error')
    })
  })

  describe('getAvailable', () => {
    it('When provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const options = {
        ADT: '5',
        CHD: '2',
        DateIn: '',
        DateOut: tomorrow(),
        Destination: 'DUB',
        Disc: '0',
        INF: '0',
        Origin: 'LTN',
        TEEN: '0',
        promoCode: 'PROMO',
        IncludeConnectingFlights: 'true',
        FlexDaysBeforeOut: '3',
        FlexDaysOut: '3',
        FlexDaysBeforeIn: '3',
        FlexDaysIn: '3',
        RoundTrip: 'true',
        ToUs: 'AGREED'
      }
      const urlParams = new URLSearchParams(options)

      await getAvailable(options)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/booking/v4/en-gb/availability?${urlParams.toString()}`
      )
    })

    it('When provided single parameter \n\t Then should fallback to defaults', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const options = { ADT: '1' }
      const defaults = {
        ADT: '1',
        CHD: '0',
        DateIn: '',
        DateOut: tomorrow(),
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
      const urlParams = new URLSearchParams({ ...defaults, ...options })

      await getAvailable(options)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/booking/v4/en-gb/availability?${urlParams.toString()}`
      )
    })

    it('When provided asked for a valid destination \n\t Then should be able to retrieve data and parse it', async () => {
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
