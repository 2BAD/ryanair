import { type Fare } from '~/fares/types.ts'

/**
 * Retrieves the fare price from a Fare object.
 *
 * @param f - The Fare object to retrieve the price from.
 */
export const getFarePrice = (f: Fare): number => (f.price !== null ? f.price.value : 0)

/**
 * Sorts two Fare objects by their price in ascending order.
 *
 * @param a - The first Fare object.
 * @param b - The second Fare object.
 */
export const sortByPrice = (a: Fare, b: Fare): number => getFarePrice(a) - getFarePrice(b)
