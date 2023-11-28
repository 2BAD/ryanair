import { distance } from '~/helpers/geodesy.ts'
import { extractCoordinates, type Location } from '~/helpers/location.ts'

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
