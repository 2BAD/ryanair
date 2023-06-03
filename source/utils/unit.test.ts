import { StrDate } from '~/date.types.ts'
import { getFirstDayOfEachMonthInRange, nextMonth, tomorrow } from '~/utils/date.ts'

describe('date', () => {
  describe('tomorrow', () => {
    it('should return a string in YYYY-MM-DD format', () => {
      const result = tomorrow()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('should return a valid date', () => {
      const result = tomorrow()
      const [year, month, day] = result.split('-').map((part) => parseInt(part))

      const date = new Date(year, month - 1, day)

      expect(date.getFullYear()).toBe(year)
      expect(date.getMonth() + 1).toBe(month)
      expect(date.getDate()).toBe(day)
    })
  })

  describe('nextMonth', () => {
    it('should return a string in YYYY-MM-DD format', () => {
      const result = nextMonth()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('should return a valid date', () => {
      const result = nextMonth()
      const [year, month, day] = result.split('-').map((part) => parseInt(part))

      const date = new Date(year, month - 1, day)

      expect(date.getFullYear()).toBe(year)
      expect(date.getMonth() + 1).toBe(month)
      expect(date.getDate()).toBe(day)
    })
  })

  describe('getFirstDayOfEachMonthInRange', () => {
    it('returns an array', () => {
      const result = getFirstDayOfEachMonthInRange('2020-01-01', '2020-12-31')
      expect(Array.isArray(result)).toBeTruthy()
    })

    it('throws a RangeError when start date is after end date', () => {
      expect(() => getFirstDayOfEachMonthInRange('2021-01-01', '2020-12-31')).toThrow(RangeError)
    })

    it('returns an array of length 1 when start and end dates are in the same month', () => {
      const result = getFirstDayOfEachMonthInRange('2022-05-15', '2022-05-20')
      expect(result).toHaveLength(1)
      expect(result[0]).toBe('2022-05-01')
    })

    it('returns an array containing first day of each month within the given range', () => {
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

  describe('zod StrDate type', () => {
    it('should pass zod type validation', () => {
      const dateString = '2022-01-31'
      expect(StrDate.parse(dateString)).toStrictEqual(dateString)
    })

    it('should throw error for wrong date string format', () => {
      const dateString = '2022/01/31'
      expect(() => StrDate.parse(dateString)).toThrowErrorMatchingSnapshot()
    })
  })
})
