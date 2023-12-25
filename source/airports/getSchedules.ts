import { Schedules, type IataCode } from '~/airports/types.ts'
import { get } from '~/client/index.ts'
import { TIMETABLE_API } from '~/endpoints.ts'

/**
 * Returns a list of available flight schedules departing from an airport.
 *
 * @param code - The IATA code of the airport
 */
export const getSchedules = async (code: IataCode): Promise<Schedules> => {
  const url = `${TIMETABLE_API}/schedules/${code}/periods`
  const data = await get(url)
  const schedules = Schedules.parse(data)

  if (Object.keys(schedules).length === 0) {
    throw new Error('Response code 404 (Not Found)')
  }

  return schedules
}
