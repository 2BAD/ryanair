import * as client from '../client'
import * as airports from './index'

describe('Airports', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getActive', () => {
    it('When asked for a list of active airports \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getActive()
      expect(data).toMatchSnapshot()
    })
  })

  describe('getClosest', () => {
    it('When asked for the closest airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getClosest()
      expect(data).toMatchSnapshot({
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */
      })
    })
  })

  describe('getDestinations', () => {
    it('When passed iata code \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const code = 'BER'
      await airports.getDestinations(code)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${code}`
      )
    })
    it('When asked for destinations from a specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getDestinations('BER')
      expect(data).toMatchSnapshot()
    })
    it('When asked for destinations from a nonexisting airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getDestinations('WRONG_IATA_CODE')).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('getInfo', () => {
    it('When passed iata code \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const code = 'BER'
      await airports.getInfo(code)

      expect(getSpy).toHaveBeenCalledWith(`https://www.ryanair.com/api/views/locate/5/airports/en/${code}`)
    })
    it('When asked for info on specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getInfo('BER')
      expect(data).toMatchSnapshot()
    })
    it('When asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getInfo('WRONG_IATA_CODE')).rejects.toThrow('Response code 404 (Not Found)')
    })
  })

  describe('searchByPhrase', () => {
    it('When searched for an airport by a phrase \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.searchByPhrase('Berlin')
      expect(data).toMatchSnapshot()
    })
    it('When searched for an airport by a phrase using different locale \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.searchByPhrase('Berlin', 'de-DE')
      expect(data).toMatchSnapshot()
    })
    it('When searched for an airport by a wrong phrase \n\t Then should get an empty array', async () => {
      expect.assertions(1)

      const data = await airports.searchByPhrase('WRONG_SEARCH_PHRASE')
      expect(data.length).toBe(0)
    })
  })

  describe('searchByRoute', () => {
    it('When provided with only required parameters \n\t Then should calls the correct URL with default locale', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const from = 'BER'
      const to = 'KRK'
      const expectedUrl = `https://www.ryanair.com/api/locate/v1/autocomplete/routes?departurePhrase=${from}&arrivalPhrase=${to}&market=en-gb`

      await airports.searchByRoute(from, to)

      expect(getSpy).toHaveBeenCalledWith(expectedUrl)
    })

    it('When provided with locale \n\t Then should calls the correct URL with custom locale', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const from = 'BER'
      const to = 'KRK'
      const locale = 'es-es'
      const expectedUrl = `https://www.ryanair.com/api/locate/v1/autocomplete/routes?departurePhrase=${from}&arrivalPhrase=${to}&market=${locale}`

      await airports.searchByRoute(from, to, locale)

      expect(getSpy).toHaveBeenCalledWith(expectedUrl)
    })
    it('When searched for an airport by a route using only starting point \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.searchByRoute('BER')
      expect(data).toMatchSnapshot()
    })
    it('When searched for an airport by a route using both points \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.searchByRoute('BER', 'KRK')
      expect(data).toMatchSnapshot()
    })
    it('When searched for an airport by a route using wrong iata code \n\t Then should get an empty array', async () => {
      expect.assertions(1)

      const data = await airports.searchByRoute('WRONG_IATA_CODE', 'WRONG_IATA_CODE')
      expect(data.length).toBe(0)
    })
  })
})
