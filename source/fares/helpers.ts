import { type Fare } from '~/fares/types.ts'

export const getFarePrice = (f: Fare): number => (f.price !== null ? f.price.value : 0)
export const sortByPrice = (a: Fare, b: Fare): number => getFarePrice(a) - getFarePrice(b)
