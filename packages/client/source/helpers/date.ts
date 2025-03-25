import { addDays, addMonths, eachMonthOfInterval, format, isAfter } from 'date-fns'
import type { StrDate } from '~/date.types.ts'

/**
 * Calculates the date for the next day (formatted as 'YYYY-MM-DD')
 */
export const tomorrow = (): string => {
  const currentDate = new Date()
  const tomorrowDate = addDays(currentDate, 1)

  // Format the date into 'YYYY-MM-DD' format
  return format(tomorrowDate, 'yyyy-MM-dd')
}

/**
 * Calculates the date for the next month (formatted as 'YYYY-MM-DD')
 */
export const nextMonth = (): string => {
  const currentDate = new Date()
  const nextMonthDate = addMonths(currentDate, 1)

  // Format the date into 'YYYY-MM-DD' format
  return format(nextMonthDate, 'yyyy-MM-dd')
}

/**
 * Returns true if the first ISO-formatted date is after the second ISO-formatted date.
 *
 * @param firstDate - The first date (formatted as 'YYYY-MM-DD')
 * @param secondDate - The second date (formatted as 'YYYY-MM-DD')
 */
export const isAfterIso = (firstDate: string, secondDate: string): boolean => {
  const first = new Date(firstDate)
  const second = new Date(secondDate)
  return isAfter(first, second)
}

/**
 * Returns an array of the first day of each month in a given date range (formatted as 'YYYY-MM-01')
 *
 * @param startDate - The start date of the range (formatted as 'YYYY-MM-DD')
 * @param endDate - The end date of the range (formatted as 'YYYY-MM-DD')
 * @throws {RangeError} - Start date must be before the end date.
 */
export const getFirstDayOfEachMonthInRange = (startDate: StrDate, endDate: StrDate): StrDate[] => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (start > end) {
    throw new RangeError('Invalid date range. The start date must be before the end date.')
  }

  return eachMonthOfInterval({ start, end }).map((d) => format(d, 'yyyy-MM-01'))
}
