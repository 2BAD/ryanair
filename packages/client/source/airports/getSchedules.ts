import { MonthlySchedule, Schedule, Schedules, type IataCode } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { TIMETABLE_API } from '~/endpoints.ts'

type Period = {
  year: number
  month: number
}

/**
 * Returns a list of available flight schedules based on different criteria.
 * This is an internal helper function used by the public API methods.
 *
 * @param from - The IATA code of the departure airport
 * @param to - Optional IATA code of the arrival airport
 * @param period - Optional period specification with year and month
 * @throws {Error} Error if no schedules are found
 */
const getSchedulesData = async (from: IataCode, to?: IataCode, period?: Period): Promise<unknown> => {
  let url = `${TIMETABLE_API}/schedules/${from}`

  if (to) {
    url += `/${to}`
    if (period?.year && period?.month) {
      url += `/years/${period.year}/months/${period.month}`
    } else {
      url += '/period'
    }
  } else {
    url += '/periods'
  }

  const data = (await get(url)) as unknown

  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    throw new Error('Response code 404 (Not Found)')
  }

  return data
}

/**
 * Returns all available flight schedules for a departure airport.
 *
 * @param from - The IATA code of the departure airport
 * @throws {Error} Error if no schedules are found
 */
export const getSchedules = async (from: IataCode): Promise<Schedules> => {
  const data = await getSchedulesData(from)
  return Schedules.parse(data)
}

/**
 * Returns flight schedules between two airports for a specific period.
 *
 * @param from - The IATA code of the departure airport
 * @param to - The IATA code of the arrival airport
 * @param year - The year for which to fetch schedules
 * @param month - The month for which to fetch schedules
 * @throws {Error} Error if no schedule is found
 */
export const getSchedulesByPeriod = async (
  from: IataCode,
  to: IataCode,
  year: number,
  month: number
): Promise<MonthlySchedule> => {
  const data = await getSchedulesData(from, to, { year, month })
  return MonthlySchedule.parse(data)
}

/**
 * Returns the flight schedule between two airports.
 *
 * @param from - The IATA code of the departure airport
 * @param to - The IATA code of the arrival airport
 * @throws {Error} Error if no schedule is found
 */
export const getSchedulesByRoute = async (from: IataCode, to: IataCode): Promise<Schedule> => {
  const data = await getSchedulesData(from, to)
  const schedule = Schedule.safeParse(data)

  if (!schedule.success) {
    throw new Error('Response code 404 (Not Found)')
  }

  return schedule.data
}
