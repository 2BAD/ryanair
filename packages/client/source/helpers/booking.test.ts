import { describe, expect, it } from 'vitest'
import {
  BookingLinkOptions,
  generateBookingLink,
  generateOneWayBookingLink,
  generateReturnBookingLink
} from './booking.ts'

describe('BookingLinkOptions', () => {
  it('should validate correct options', () => {
    expect.assertions(1)

    const options = {
      originIata: 'TGD',
      destinationIata: 'BER',
      dateOut: '2025-03-30',
      adults: 2,
      teens: 1,
      children: 0,
      infants: 0,
      isConnectedFlight: false,
      isReturn: false,
      discount: 0,
      promoCode: '',
      market: 'gb',
      locale: 'en'
    }

    expect(BookingLinkOptions.parse(options)).toEqual(options)
  })

  it('should throw an error for invalid IATA code length', () => {
    expect.assertions(2)

    // Too short
    expect(() =>
      BookingLinkOptions.parse({
        originIata: 'TG',
        destinationIata: 'BER',
        dateOut: '2025-03-30'
      })
    ).toThrow()

    // Too long
    expect(() =>
      BookingLinkOptions.parse({
        originIata: 'TGDD',
        destinationIata: 'BER',
        dateOut: '2025-03-30'
      })
    ).toThrow()
  })

  it('should throw an error for invalid date format', () => {
    expect.assertions(1)

    expect(() =>
      BookingLinkOptions.parse({
        originIata: 'TGD',
        destinationIata: 'BER',
        dateOut: '2025/03/30'
      })
    ).toThrow()
  })

  it('should throw an error for invalid passenger counts', () => {
    expect.assertions(2)

    // Adults below minimum
    expect(() =>
      BookingLinkOptions.parse({
        originIata: 'TGD',
        destinationIata: 'BER',
        dateOut: '2025-03-30',
        adults: 0
      })
    ).toThrow()

    // Teens above maximum
    expect(() =>
      BookingLinkOptions.parse({
        originIata: 'TGD',
        destinationIata: 'BER',
        dateOut: '2025-03-30',
        teens: 25
      })
    ).toThrow()
  })
})

describe('generateBookingLink', () => {
  it('should generate a valid booking link with minimum required options', () => {
    expect.assertions(4)

    const link = generateBookingLink({
      originIata: 'TGD',
      destinationIata: 'BER',
      dateOut: '2025-03-30'
    })

    expect(link).toContain('https://www.ryanair.com/gb/en/trip/flights/select?')
    expect(link).toContain('originIata=TGD')
    expect(link).toContain('destinationIata=BER')
    expect(link).toContain('dateOut=2025-03-30')
  })

  it('should include all parameters in the URL', () => {
    expect.assertions(12)

    const link = generateBookingLink({
      originIata: 'TGD',
      destinationIata: 'BER',
      dateOut: '2025-03-30',
      adults: 2,
      teens: 1,
      children: 1,
      infants: 1,
      isConnectedFlight: true,
      isReturn: true,
      discount: 10,
      promoCode: 'TEST123',
      market: 'de',
      locale: 'de'
    })

    expect(link).toContain('https://www.ryanair.com/de/de/trip/flights/select?')
    expect(link).toContain('originIata=TGD')
    expect(link).toContain('destinationIata=BER')
    expect(link).toContain('dateOut=2025-03-30')
    expect(link).toContain('adults=2')
    expect(link).toContain('teens=1')
    expect(link).toContain('children=1')
    expect(link).toContain('infants=1')
    expect(link).toContain('isConnectedFlight=true')
    expect(link).toContain('isReturn=true')
    expect(link).toContain('discount=10')
    expect(link).toContain('promoCode=TEST123')
  })

  it('should handle optional dateIn parameter', () => {
    expect.assertions(2)

    const linkWithoutDateIn = generateBookingLink({
      originIata: 'TGD',
      destinationIata: 'BER',
      dateOut: '2025-03-30'
    })

    const linkWithDateIn = generateBookingLink({
      originIata: 'TGD',
      destinationIata: 'BER',
      dateOut: '2025-03-30',
      dateIn: '2025-04-05'
    })

    expect(linkWithoutDateIn).toContain('dateIn=')
    expect(linkWithDateIn).toContain('dateIn=2025-04-05')
  })
})

describe('generateOneWayBookingLink', () => {
  it('should generate a one-way booking link with default values', () => {
    expect.assertions(3)

    const link = generateOneWayBookingLink('TGD', 'BER', '2025-03-30')

    expect(link).toContain('originIata=TGD')
    expect(link).toContain('destinationIata=BER')
    expect(link).toContain('isReturn=false')
  })

  it('should override default values with provided options', () => {
    expect.assertions(3)

    const link = generateOneWayBookingLink('TGD', 'BER', '2025-03-30', 2, {
      market: 'it',
      locale: 'it'
    })

    expect(link).toContain('https://www.ryanair.com/it/it/trip/flights/select?')
    expect(link).toContain('adults=2')
    // Should not override the isReturn parameter in one-way link
    expect(link).toContain('isReturn=false')
  })
})

describe('generateReturnBookingLink', () => {
  it('should generate a return booking link with both dates', () => {
    expect.assertions(4)

    const link = generateReturnBookingLink('TGD', 'BER', '2025-03-30', '2025-04-05')

    expect(link).toContain('originIata=TGD')
    expect(link).toContain('destinationIata=BER')
    expect(link).toContain('dateOut=2025-03-30')
    expect(link).toContain('dateIn=2025-04-05')
  })

  it('should set isReturn to true for return bookings', () => {
    expect.assertions(1)

    const link = generateReturnBookingLink('TGD', 'BER', '2025-03-30', '2025-04-05')

    expect(link).toContain('isReturn=true')
  })

  it('should override default values with provided options', () => {
    expect.assertions(2)

    const link = generateReturnBookingLink('TGD', 'BER', '2025-03-30', '2025-04-05', 3, {
      teens: 2,
      children: 1
    })

    expect(link).toContain('adults=3')
    expect(link).toContain('teens=2')
  })
})
