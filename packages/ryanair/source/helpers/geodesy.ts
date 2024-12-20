import type { Coordinates } from '~/airports/types.ts'

/**
 * Converts an angle from degrees to radians.
 *
 * @param n - The angle in degrees to convert to radians.
 */
const toRadians = (n: number): number => n * (Math.PI / 180)

/**
 * Returns the distance along the surface of the earth between two points.
 *
 * Uses haversine formula:
 * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2);
 * c = 2 ⋅ atan2(√a, √(1−a));
 * d = R ⋅ c;
 *
 * where φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
 * note that angles need to be in radians to pass to trig functions!
 *
 * note greek letters (e.g. φ, λ, θ) are used for angles in radians to distinguish from angles in
 * degrees (e.g. lat, lon, brng)
 *
 * @param start - Latitude/longitude of start point.
 * @param end - Latitude/longitude of destination point.
 * @param radius - Radius of earth (defaults to mean radius in metres).
 * @returns Distance between two points, in meters.
 *
 * @example
 */
export const distance = (start: Coordinates, end: Coordinates, radius = 6371e3): number => {
  const R = radius
  const φ1 = toRadians(start.latitude)
  const λ1 = toRadians(start.longitude)
  const φ2 = toRadians(end.latitude)
  const λ2 = toRadians(end.longitude)
  const Δφ = φ2 - φ1
  const Δλ = λ2 - λ1

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d
}
