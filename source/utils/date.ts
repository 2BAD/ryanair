import { addDays, eachMonthOfInterval, format } from 'date-fns'
import { type StrDate } from '~/date.types'

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
 * Returns an array of the first day of each month in a given date range (formatted as 'YYYY-MM-01')
 *
 * @param startDate - The start date of the range (formatted as 'YYYY-MM-DD')
 * @param endDate - The end date of the range (formatted as 'YYYY-MM-DD')
 *
 */
export const getFirstDayOfEachMonthInRange = (startDate: StrDate, endDate: StrDate): StrDate[] => {
  const dates = eachMonthOfInterval({ start: new Date(startDate), end: new Date(endDate) })
  return dates.map((d) => format(d, 'yyyy-MM-01'))
}
