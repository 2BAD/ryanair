import { describe, expect, it, vi } from 'vitest'
import * as client from '~/client/index.ts'
import { FARE_FINDER_API } from '~/endpoints.ts'
import { isAfterIso, nextMonth, tomorrow } from '~/helpers/date.ts'
import { fares } from '~/index.ts'

const from = 'LON' // all London airports
const to = 'MIL' // all Milan airports

describe('fares', () => {
  describe('getCheapestPerDay', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const startDate = tomorrow()
      const currency = 'EUR'
      await fares.getCheapestPerDay(from, to, startDate, currency)

      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        `${FARE_FINDER_API}/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${startDate}&currency=${currency}`
      )
    })

    it('when provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const startDate = tomorrow()
      const currency = 'EUR'

      const data = await fares.getCheapestPerDay(from, to, startDate, currency)
      expect(data.outbound.fares.length).toBeGreaterThan(0)
    })

    it('when asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)

      const from = 'WRONG_IATA_CODE'
      const startDate = tomorrow()
      const currency = 'EUR'

      await expect(fares.getCheapestPerDay(from, to, startDate, currency)).rejects.toThrow(
        'Response code 400 (Bad Request)'
      )
    })
  })

  describe('findDailyFaresInRange', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const startDate = tomorrow()
      const endDate = tomorrow()
      const currency = 'EUR'

      const [year, month] = startDate.split('-')
      const firstDayOfMonth = `${year}-${month}-01`

      await fares.findDailyFaresInRange(from, to, startDate, endDate, currency)

      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        `${FARE_FINDER_API}/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${firstDayOfMonth}&currency=${currency}`
      )
    })

    it('when provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const startDate = tomorrow()
      const endDate = nextMonth()
      const currency = 'EUR'

      const data = await fares.findDailyFaresInRange(from, to, startDate, endDate, currency)
      expect(Array.isArray(data)).toBeTruthy()
    })

    it('when provided with all parameters \n\t Then should not have any nullish prices', async () => {
      expect.assertions(2)

      const startDate = tomorrow()
      const endDate = nextMonth()
      const currency = 'EUR'

      const data = await fares.findDailyFaresInRange(from, to, startDate, endDate, currency)
      expect(Array.isArray(data)).toBeTruthy()
      expect(data.every((fare) => fare.price !== null)).toBeTruthy()
    })
  })

  describe('findCheapestRoundTrip', () => {
    it('when provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)

      const getSpy = vi.spyOn(client, 'get')
      const startDate = tomorrow()
      const endDate = tomorrow()
      const currency = 'EUR'

      const [year, month] = startDate.split('-')
      const firstDayOfMonth = `${year}-${month}-01`

      await fares.findCheapestRoundTrip(from, to, startDate, endDate, currency)

      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        `${FARE_FINDER_API}/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${firstDayOfMonth}&currency=${currency}`
      )
    })

    it('when provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const startDate = tomorrow()
      const endDate = nextMonth()
      const currency = 'EUR'

      const data = await fares.findCheapestRoundTrip(from, to, startDate, endDate, currency)
      expect(Array.isArray(data)).toBeTruthy()
    })

    it('when provided with all parameters \n\t Then should not have any nullish prices', async () => {
      expect.assertions(3)

      const startDate = tomorrow()
      const endDate = nextMonth()
      const currency = 'EUR'

      const data = await fares.findCheapestRoundTrip(from, to, startDate, endDate, currency)

      expect(Array.isArray(data)).toBeTruthy()
      expect(data.every((trip) => trip.departure.price !== null)).toBeTruthy()
      expect(data.every((trip) => trip.return.price !== null)).toBeTruthy()
    })

    it('when provided with all parameters \n\t Then should have return trips after departure', async () => {
      expect.assertions(2)

      const startDate = tomorrow()
      const endDate = nextMonth()
      const currency = 'EUR'

      const data = await fares.findCheapestRoundTrip(from, to, startDate, endDate, currency)

      expect(Array.isArray(data)).toBeTruthy()
      expect(data.every((trip) => isAfterIso(trip.return.day, trip.departure.day))).toBeTruthy()
    })
  })
})
