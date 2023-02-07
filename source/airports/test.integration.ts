import * as airports from './index'

describe('Airports', () => {
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
      expect(data).toMatchSnapshot()
    })
  })

  describe('getDestinations', () => {
    it('When asked for destinations from a specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getDestinations('BER')
      expect(data).toMatchSnapshot()
    })
    it('When asked for destinations from a nonexisting airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getDestinations('WRONG_IATA_CODE')).rejects.toThrow('HTTP Error')
    })
  })

  describe('getInfo', () => {
    it('When asked for info on specific airport \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.getInfo('BER')
      expect(data).toMatchSnapshot()
    })
    it('When asked for info on non existing airport \n\t Then should throw HTTP error', async () => {
      expect.assertions(1)
      await expect(airports.getInfo('WRONG_IATA_CODE')).rejects.toThrow('HTTP Error')
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
    it('When searched for an airport by a route using only starting point \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.searchByRoute('BER')
      expect(data).toMatchSnapshot()
    })
    it('When searched for an airport by a route using both points \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)

      const data = await airports.searchByRoute('BRU', 'BER')
      expect(data).toMatchSnapshot()
    })
    it('When searched for an airport by a route using wrong iata code \n\t Then should get an empty array', async () => {
      expect.assertions(1)

      const data = await airports.searchByRoute('WRONG_IATA_CODE', 'WRONG_IATA_CODE')
      expect(data.length).toBe(0)
    })
  })
})
