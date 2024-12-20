import { Airport, Coordinates } from '~/airports/types.ts'

export type Location = Airport | Coordinates

/**
 * Extracts the coordinates from a Location object.
 *
 * @param location - The Airport or Coordinates object.
 * @throws {Error} If unable to extract coordinates from the location.
 */
export const extractCoordinates = (location: Location): Coordinates => {
  const a = Airport.safeParse(location)
  if (a.success) {
    return a.data.coordinates
  }

  const c = Coordinates.safeParse(location)
  if (c.success) {
    return c.data
  }

  throw new Error(`Unable to extract coordinates from location: ${JSON.stringify(location)}`)
}
