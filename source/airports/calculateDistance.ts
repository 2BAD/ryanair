import { Airport, Coordinates } from '~/airports/types.ts'
import { distance } from '~/helpers/geodesy.ts'

type Location = Airport | Coordinates

/**
 * Extracts the coordinates from a Location object.
 *
 * @param location - The Airport or Coordinates object.
 * @throws {Error} If unable to extract coordinates from the location.
 */
const extractCoordinates = (location: Location): Coordinates => {
  const a = Airport.safeParse(location)
  if (a.success) {
    return a.data.coordinates
  }

  const c = Coordinates.safeParse(location)
  if (c.success) {
    return c.data
  }

  throw new Error('Unable to extract coordinates from location: ' + JSON.stringify(location))
}

/**
 * Calculates the total distance between consecutive locations.
 *
 * @param locations - The array of Location objects.
 */
export const calculateDistance = (locations: Location[]): number => {
  let totalDistance = 0

  locations.reduce((previous, current) => {
    const p1 = extractCoordinates(previous)
    const p2 = extractCoordinates(current)

    totalDistance += distance(p1, p2)
    return current
  })

  return totalDistance
}
