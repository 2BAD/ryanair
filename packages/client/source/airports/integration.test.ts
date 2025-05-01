import { afterEach, describe, expect, it, vi } from 'vitest'
// biome-ignore lint/style/noNamespaceImport: useful for spying
import * as client from '~/client/index.ts'
import { TIMETABLE_API, VIEWS_API } from '~/endpoints.ts'
import { airports } from '~/index.ts'

const AirportShortSnapshot = {
  aliases: [],
  city: {
    code: expect.any(String),
    name: expect.any(String)
  },
  code: expect.any(String),
  coordinates: {
    latitude: expect.any(Number),
    longitude: expect.any(Number)
  },
  country: {
    code: expect.any(String),
    name: expect.any(String)
  },
  name: expect.any(String)
}

const from = 'BER' // Berlin airport
const to = 'VCE' // Krakow airport

describe('airports', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getActive', () => {
    it('when asked for a list of active airports \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getActive()
      expect(data.length).toBeGreaterThan(0)
    })
  })

  describe('getActiveV3', () => {
    it('when asked for a list of active airports (older v3 api) \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getActiveV3()
      expect(data.length).toBeGreaterThan(0)
    })
  })

  describe('getClosest', () => {
    it('when asked for the closest airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getClosest()
      expect(data).toMatchSnapshot(AirportShortSnapshot)
    })
  })

  describe('getNearby', () => {
    it('when asked for nearby airports \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getNearby()
      expect(data).toBeTruthy()
    })
  })

  describe('getDestinations', () => {
    it('when passed iata code \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const code = 'BER'
      await airports.getDestinations(code)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${VIEWS_API}/searchWidget/routes/en/airport/${code}`)
    })
    it('when asked for destinations from a specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getDestinations('BER')
      expect(data).toMatchSnapshot()
    })
    it('when asked for destinations from a nonexisting airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getDestinations('WRONG_IATA_CODE')).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('getInfo', () => {
    it('when passed iata code \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const code = 'BER'
      await airports.getInfo(code)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${VIEWS_API}/5/airports/en/${code}`)
    })
    it('when asked for info on specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getInfo('BER')
      expect(data).toMatchSnapshot()
    })
    it('when asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getInfo('WRONG_IATA_CODE')).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('getSchedules', () => {
    it('when passed iata code', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const code = 'BER'
      await airports.getSchedules(code)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${TIMETABLE_API}/schedules/${code}/periods`)
    })
    it('when asked for schedules for a specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(4)

      const data = await airports.getSchedules(from)
      expect(data[to]).haveOwnProperty('firstFlightDate')
      expect(data[to]).haveOwnProperty('lastFlightDate')
      expect(data[to]).haveOwnProperty('months')
      expect(data[to]).haveOwnProperty('monthsFromToday')
    })
    it('when asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getSchedules('WRONG_IATA_CODE')).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('getSchedulesByRoute', () => {
    it('should call correct endpoint with from and to IATA codes', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      await airports.getSchedulesByRoute(from, to)

      expect(getSpy).toHaveBeenCalledWith(`${TIMETABLE_API}/schedules/${from}/${to}/period`)
    })

    it('should return parsed schedule data', async () => {
      expect.assertions(4)
      const data = await airports.getSchedulesByRoute(from, to)

      expect(data).haveOwnProperty('firstFlightDate')
      expect(data).haveOwnProperty('lastFlightDate')
      expect(data).haveOwnProperty('months')
      expect(data).haveOwnProperty('monthsFromToday')
    })

    it('should throw HTTP error for non-existing route', async () => {
      expect.assertions(1)
      await expect(airports.getSchedulesByRoute('BER', 'XXX')).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('getSchedulesByPeriod', () => {
    it('should call correct endpoint with from, to, year and month', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1

      await airports.getSchedulesByPeriod(from, to, year, month)

      expect(getSpy).toHaveBeenCalledWith(`${TIMETABLE_API}/schedules/${from}/${to}/years/${year}/months/${month}`)
    })

    it('should return parsed monthly schedule data', async () => {
      expect.assertions(5)
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1

      const data = await airports.getSchedulesByPeriod(from, to, year, month)

      expect(data).haveOwnProperty('month')
      expect(data).haveOwnProperty('days')
      expect(data.days[0]).haveOwnProperty('day')
      expect(data.days[0]).haveOwnProperty('flights')
      expect(data.days[0]?.flights[0]).haveOwnProperty('carrierCode')
    })

    it('should throw HTTP error for non-existing period', async () => {
      expect.assertions(1)
      await expect(airports.getSchedulesByPeriod('BER', 'BRU', new Date().getFullYear(), 13)).rejects.toThrow(
        'Response code 404 (Not Found)'
      )
    })
  })

  describe('findRoutes', () => {
    it('when passed iata codes \n\t Then should call the correct API URLs', async () => {
      expect.assertions(3)
      const getSpy = vi.spyOn(client, 'get')
      await airports.findRoutes(from, to)

      expect(getSpy).toHaveBeenNthCalledWith(1, `${VIEWS_API}/searchWidget/routes/en/airport/${from}`)
      expect(getSpy).toHaveBeenNthCalledWith(2, `${VIEWS_API}/searchWidget/routes/en/airport/${to}`)
      expect(getSpy).toHaveBeenCalledTimes(2)
    })
    it('when asked for specific route between two airports \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)
      const from = 'BER' // Berlin airport
      const to = 'GDN' // Gdansk airport
      const data = await airports.findRoutes(from, to)

      expect(data).toMatchSnapshot()
    })
    it('when asked for direct route between two airports \n\t Then should return a route that contains only origin and destination', async () => {
      expect.assertions(1)
      const data = await airports.findRoutes(from, to)

      expect(data).toHaveLength(1)
    })
    it('when asked for route between two airports that do not have one leg connection \n\t Then should return an empty array', async () => {
      expect.assertions(1)
      const from = 'TAT' // Poprad - Tatry (Tatra Mountains) airport
      const to = 'OUD' // Oujda airport
      const data = await airports.findRoutes(from, to)

      expect(data).toHaveLength(0)
    })
    it('when asked for info on non existing airports \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      const from = 'BER' // Berlin airport
      const to = 'WRONG_IATA'
      await expect(airports.findRoutes(from, to)).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('calculateDistance', () => {
    it('when passed two set of coordinates \n\t Then should calculate distance between them', () => {
      expect.assertions(2)
      const from = {
        latitude: 52.3667,
        longitude: 13.5033
      } // Berlin airport
      const to = {
        latitude: 50.0777,
        longitude: 19.7848
      } // Krakow airport
      const distance = airports.calculateDistance([from, to])

      expect(distance).toBeGreaterThan(505800)
      expect(distance).toBeLessThan(506000)
    })
    it('when passed two airport objects \n\t Then should calculate distance between them', async () => {
      expect.assertions(2)
      const from = await airports.getInfo('BER') // Berlin airport
      const to = await airports.getInfo('KRK') // Krakow airport
      const distance = airports.calculateDistance([from, to])

      expect(distance).toBeGreaterThan(505800)
      expect(distance).toBeLessThan(506000)
    })
  })
})
