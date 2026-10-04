import { z } from 'zod'
import { StrDate, StrDateTime } from '~/date.types.ts'

export const Price = z.object({
  value: z.number(),
  valueMainUnit: z.string(),
  valueFractionalUnit: z.string(),
  currencyCode: z.string(),
  currencySymbol: z.string()
})
export type Price = z.infer<typeof Price>

export const Fare = z.object({
  day: StrDate,
  arrivalDate: StrDateTime.nullable(),
  departureDate: StrDateTime.nullable(),
  price: Price.nullable(),
  soldOut: z.boolean(),
  unavailable: z.boolean()
})
export type Fare = z.infer<typeof Fare>

export const CheapestFares = z.object({
  outbound: z.object({
    fares: z.array(Fare),
    minFare: Fare.nullable(),
    maxFare: Fare.nullable()
  })
})
export type CheapestFares = z.infer<typeof CheapestFares>

export const RoundTrip = z.object({
  departure: Fare,
  return: Fare,
  price: z.number()
})
export type RoundTrip = z.infer<typeof RoundTrip>
