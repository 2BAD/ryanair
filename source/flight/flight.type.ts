import { z } from 'zod'
import { IataCode } from '../airport/airport.type'
import { StrDate, StrDateTimeMs } from '../date.type'

const FROM_0_TO_24_REGEX = /\b([0-9]|1[0-9]|2[0-4])\b/g
const FROM_0_TO_24_ERROR_MESSAGE = 'Only numbers between 0 and 24 are accepted.'
const FROM_1_TO_25_REGEX = /\b([1-9]|1[0-9]|2[0-5])\b/g
const FROM_1_TO_25_ERROR_MESSAGE = 'Only numbers between 1 and 25 are accepted.'

const StrRange1To4 = z.string().length(1).regex(/[1-4]/)
const StrRange0To24 = z.string().min(1).max(2).regex(FROM_0_TO_24_REGEX, FROM_0_TO_24_ERROR_MESSAGE)
const StrRange1To25 = z.string().min(1).max(2).regex(FROM_1_TO_25_REGEX, FROM_1_TO_25_ERROR_MESSAGE)
const StrBoolean = z.union([z.literal('true'), z.literal('false')])

export const FlightDateList = z.array(StrDate)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FlightDateList = z.infer<typeof FlightDateList>

export const AvailabilityOptions = z.object({
  ADT: StrRange1To25,
  CHD: StrRange0To24,
  DateIn: z.union([StrDate, z.string().max(0)]),
  DateOut: StrDate,
  Destination: IataCode,
  Disc: z.literal('0'),
  INF: StrRange0To24,
  Origin: IataCode,
  TEEN: StrRange0To24,
  promoCode: z.string(),
  IncludeConnectingFlights: StrBoolean,
  FlexDaysBeforeOut: StrRange1To4,
  FlexDaysOut: StrRange1To4,
  FlexDaysBeforeIn: StrRange1To4,
  FlexDaysIn: StrRange1To4,
  RoundTrip: StrBoolean,
  ToUs: z.literal('AGREED')
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AvailabilityOptions = z.infer<typeof AvailabilityOptions>

export const Segment = z.object({
  segmentNr: z.number(),
  origin: IataCode,
  destination: IataCode,
  flightNumber: z.string(),
  time: z.array(StrDateTimeMs),
  timeUTC: z.array(z.string().datetime()),
  duration: z.string()
})

export const Fare = z.object({
  type: z.string(),
  amount: z.number(),
  count: z.number(),
  hasDiscount: z.boolean(),
  publishedFare: z.number(),
  discountInPercent: z.number(),
  hasPromoDiscount: z.boolean(),
  discountAmount: z.number(),
  hasBogof: z.boolean()
})

export const FareType = z.object({
  fareKey: z.string(),
  fareClass: z.string(),
  fares: z.array(Fare)
})

export const Flight = z.object({
  faresLeft: z.number(),
  flightKey: z.string(),
  infantsLeft: z.number(),
  regularFare: FareType,
  operatedBy: z.string(),
  segments: z.array(Segment),
  flightNumber: z.string(),
  time: z.array(StrDateTimeMs),
  timeUTC: z.array(z.string().datetime()),
  duration: z.string()
})

export const FlightDate = z.object({
  dateOut: StrDateTimeMs,
  flights: z.array(Flight)
})

export const Trip = z.object({
  origin: IataCode,
  originName: z.string(),
  destination: IataCode,
  destinationName: z.string(),
  routeGroup: z.string(),
  tripType: z.string(),
  upgradeType: z.string(),
  dates: z.array(FlightDate)
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Trip = z.infer<typeof Trip>

export const AvailabilityResponse = z.object({
  termsOfUse: z.string().url(),
  currency: z.string().length(3),
  currPrecision: z.number(),
  routeGroup: z.string(),
  tripType: z.string(),
  upgradeType: z.string(),
  trips: z.array(Trip),
  serverTimeUTC: z.string().datetime()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AvailabilityResponse = z.infer<typeof AvailabilityResponse>
