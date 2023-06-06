import * as client from '~/client.ts'
import * as airports from '~/airports/index.ts'

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

  describe('getClosest', () => {
    it('when asked for the closest airport \n\t Then should be able to retrieve data and parse it', async () => {
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
    it('when passed iata code \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const code = 'BER'
      await airports.getDestinations(code)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${code}`
      )
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

      expect(getSpy).toHaveBeenCalledWith(`https://www.ryanair.com/api/views/locate/5/airports/en/${code}`)
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
})
