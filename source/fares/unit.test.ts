import { getFarePrice } from '~/fares/helpers.ts'
import { type Fare } from '~/fares/types.ts'

describe('getFarePrice', () => {
  it('should return 0 if Fare price is null', () => {
    const fare: Fare = {
      day: '2023-09-01',
      arrivalDate: '2023-09-01T12:40:00',
      departureDate: '2023-09-01T11:15:00',
      price: null,
      soldOut: false,
      unavailable: false
    }
    expect(getFarePrice(fare)).toBe(0)
  })

  it('should return Fare price if not null', () => {
    const fare: Fare = {
      day: '2023-09-01',
      arrivalDate: '2023-09-01T12:40:00',
      departureDate: '2023-09-01T11:15:00',
      price: {
        value: 56.12,
        valueMainUnit: '56',
        valueFractionalUnit: '12',
        currencyCode: 'EUR',
        currencySymbol: '€'
      },
      soldOut: false,
      unavailable: false
    }
    expect(getFarePrice(fare)).toBe(56.12)
  })
})
