import * as client from '../client'
import { cheapestPerDay } from './index'

describe('Fares', () => {
  describe('cheapestPerDay', () => {
    it('When provided with all parameters \n\t Then should call the correct API URL', async () => {
      expect.assertions(1)
      const getSpy = vi.spyOn(client, 'get')
      const from = 'DUB' // Dublin airport
      const to = 'LTN' // London Luton airport
      const startDate = '2024-01-01'
      const currency = 'EUR'
      await cheapestPerDay(from, to, startDate, currency)

      expect(getSpy).toHaveBeenCalledWith(
        `https://www.ryanair.com/api/farfnd/v4/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${startDate}&currency=${currency}`
      )
    })

    it('When provided with all parameters \n\t Then should be able to retrieve data and parse it', async () => {
      expect.assertions(1)
      const from = 'DUB' // Dublin airport
      const to = 'LTN' // London Luton airport
      const startDate = '2024-01-01'
      const currency = 'EUR'

      const data = await cheapestPerDay(from, to, startDate, currency)
      expect(data).toMatchSnapshot()
    })

    it('throws an error if invalid IATA code is provided', async () => {
      const from = 'WRONG_IATA_CODE'
      const to = 'LTN' // London Luton airport
      const startDate = '2024-01-01'
      const currency = 'EUR'

      await expect(cheapestPerDay(from, to, startDate, currency)).rejects.toThrow('HTTP Error')
    })
  })
})
