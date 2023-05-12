import { StrDate } from '~/date.types'
import { tomorrow } from '~/utils/date'

describe('tomorrow', () => {
  it('should return a string in YYYY-MM-DD format', () => {
    const result = tomorrow()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should return a valid date', () => {
    const result = tomorrow()
    const [year, month, day] = result.split('-').map((part) => parseInt(part))

    // @ts-expect-error even if the values are going to be undefined the test will cover it
    const date = new Date(year, month - 1, day)

    expect(date.getFullYear()).toBe(year)
    expect(date.getMonth() + 1).toBe(month)
    expect(date.getDate()).toBe(day)
  })

  it('should pass zod type validation', () => {
    const dateString = '2022-01-31'
    expect(StrDate.parse(dateString)).toEqual(dateString)
  })

  it('should throw error for wrong date string format', () => {
    const dateString = '2022/01/31'
    expect(() => StrDate.parse(dateString)).toThrowError()
  })
})
