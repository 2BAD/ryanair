import { describe, expect, it } from 'vitest'
import { StrDate } from '~/date.types.ts'
import type { Fare } from '~/fares/types.ts'
import { getFirstDayOfEachMonthInRange, nextMonth, tomorrow } from '~/helpers/date.ts'
import { getFarePrice } from '~/helpers/fares.ts'
import { extractCoordinates, type Location } from './location.ts'

describe('date', () => {
  describe('tomorrow', () => {
    it('should return a string in YYYY-MM-DD format', () => {
      expect.assertions(1)

      const result = tomorrow()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('should return a valid date', () => {
      expect.assertions(3)

      const result = tomorrow()
      const [year, month, day] = result.split('-').map((part) => Number.parseInt(part, 10))

      // @ts-expect-error even if the values are going to be undefined the test will cover it
      const date = new Date(year, month - 1, day)

      expect(date.getFullYear()).toBe(year)
      expect(date.getMonth() + 1).toBe(month)
      expect(date.getDate()).toBe(day)
    })
  })

  describe('nextMonth', () => {
    it('should return a string in YYYY-MM-DD format', () => {
      expect.assertions(1)

      const result = nextMonth()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('should return a valid date', () => {
      expect.assertions(3)

      const result = nextMonth()
      const [year, month, day] = result.split('-').map((part) => Number.parseInt(part, 10))

      // @ts-expect-error even if the values are going to be undefined the test will cover it
      const date = new Date(year, month - 1, day)

      expect(date.getFullYear()).toBe(year)
      expect(date.getMonth() + 1).toBe(month)
      expect(date.getDate()).toBe(day)
    })
  })

  describe('getFirstDayOfEachMonthInRange', () => {
    it('returns an array', () => {
      expect.assertions(1)

      const result = getFirstDayOfEachMonthInRange('2020-01-01', '2020-12-31')
      expect(Array.isArray(result)).toBeTruthy()
    })

    it('throws a RangeError when start date is after end date', () => {
      expect.assertions(1)

      expect(() => getFirstDayOfEachMonthInRange('2021-01-01', '2020-12-31')).toThrow(RangeError)
    })

    it('returns an array of length 1 when start and end dates are in the same month', () => {
      expect.assertions(2)

      const result = getFirstDayOfEachMonthInRange('2022-05-15', '2022-05-20')
      expect(result).toHaveLength(1)
      expect(result[0]).toBe('2022-05-01')
    })

    it('returns an array containing first day of each month within the given range', () => {
      expect.assertions(2)

      const result = getFirstDayOfEachMonthInRange('2023-06-15', '2024-03-10')
      expect(result).toHaveLength(10)
      expect(result).toStrictEqual([
        '2023-06-01',
        '2023-07-01',
        '2023-08-01',
        '2023-09-01',
        '2023-10-01',
        '2023-11-01',
        '2023-12-01',
        '2024-01-01',
        '2024-02-01',
        '2024-03-01'
      ])
    })
  })
})

describe('zod StrDate type', () => {
  it('should pass zod type validation', () => {
    expect.assertions(1)

    const dateString = '2022-01-31'
    expect(StrDate.parse(dateString)).toStrictEqual(dateString)
  })

  it('should throw error for wrong date string format', () => {
    expect.assertions(1)

    const dateString = '2022/01/31'
    expect(() => StrDate.parse(dateString)).toThrowErrorMatchingSnapshot()
  })
})

describe('getFarePrice', () => {
  it('should return 0 if Fare price is null', () => {
    expect.assertions(1)

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
    expect.assertions(1)

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

describe('extractCoordinates', () => {
  it('should extract coordinates from Airport object', () => {
    expect.assertions(1)

    const airport = {
      code: 'BER',
      name: 'Berlin Brandenburg',
      seoName: 'brandenburg',
      aliases: [],
      base: true,
      city: {
        name: 'Berlin',
        code: 'BERLIN',
        macCode: 'BER'
      },
      macCity: {
        name: 'Berlin',
        code: 'BERLIN',
        macCode: 'BER'
      },
      region: {
        name: 'Berlin-Brandenburg',
        code: 'BERLIN-BRANDENBURG'
      },
      country: {
        code: 'de',
        iso3code: 'DEU',
        name: 'Germany',
        currency: 'EUR',
        defaultAirportCode: 'HHN',
        schengen: true
      },
      coordinates: {
        latitude: 52.3667,
        longitude: 13.5033
      },
      timeZone: 'Europe/Berlin'
    }

    expect(extractCoordinates(airport)).toStrictEqual(airport.coordinates)
  })

  it('should extract coordinates from Location object', () => {
    expect.assertions(1)

    const coordinates = {
      latitude: 52.3667,
      longitude: 13.5033
    }
    expect(extractCoordinates(coordinates)).toStrictEqual(coordinates)
  })

  it('should throw an error when provided with wrong data', () => {
    expect.assertions(1)

    const badInput = { unexpectedField: true }
    expect(() => extractCoordinates(badInput as unknown as Location)).toThrow(
      `Unable to extract coordinates from location: ${JSON.stringify(badInput)}`
    )
  })
})
