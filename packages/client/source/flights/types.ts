import { z } from 'zod'
import { IataCode } from '~/airports/types.ts'
import { StrDate, StrDateTimeMs } from '~/date.types.ts'

const FROM_0_TO_24_REGEX = /\b([0-9]|1[0-9]|2[0-4])\b/g
const FROM_0_TO_24_ERROR_MESSAGE = 'Only numbers between 0 and 24 are accepted.'
const FROM_1_TO_25_REGEX = /\b([1-9]|1[0-9]|2[0-5])\b/g
const FROM_1_TO_25_ERROR_MESSAGE = 'Only numbers between 1 and 25 are accepted.'

const StrRange1To4 = z.string().length(1).regex(/[1-4]/)
const StrRange0To24 = z.string().min(1).max(2).regex(FROM_0_TO_24_REGEX, FROM_0_TO_24_ERROR_MESSAGE)
const StrRange1To25 = z.string().min(1).max(2).regex(FROM_1_TO_25_REGEX, FROM_1_TO_25_ERROR_MESSAGE)
const StrBoolean = z.string().regex(/true|false/g)

export const AvailabilityOptions = z.object({
  // biome-ignore lint/style/useNamingConvention: remote api props
  ADT: StrRange1To25,
  // biome-ignore lint/style/useNamingConvention: remote api props
  CHD: StrRange0To24,
  // biome-ignore lint/style/useNamingConvention: remote api props
  DateIn: z.union([StrDate, z.string().max(0)]),
  // biome-ignore lint/style/useNamingConvention: remote api props
  DateOut: StrDate,
  // biome-ignore lint/style/useNamingConvention: remote api props
  Destination: IataCode,
  // biome-ignore lint/style/useNamingConvention: remote api props
  Disc: z.string(),
  // biome-ignore lint/style/useNamingConvention: remote api props
  INF: StrRange0To24,
  // biome-ignore lint/style/useNamingConvention: remote api props
  Origin: IataCode,
  // biome-ignore lint/style/useNamingConvention: remote api props
  TEEN: StrRange0To24,
  promoCode: z.string(),
  // biome-ignore lint/style/useNamingConvention: remote api props
  IncludeConnectingFlights: StrBoolean,
  // biome-ignore lint/style/useNamingConvention: remote api props
  FlexDaysBeforeOut: StrRange1To4,
  // biome-ignore lint/style/useNamingConvention: remote api props
  FlexDaysOut: StrRange1To4,
  // biome-ignore lint/style/useNamingConvention: remote api props
  FlexDaysBeforeIn: StrRange1To4,
  // biome-ignore lint/style/useNamingConvention: remote api props
  FlexDaysIn: StrRange1To4,
  // biome-ignore lint/style/useNamingConvention: remote api props
  RoundTrip: StrBoolean,
  // biome-ignore lint/style/useNamingConvention: remote api props
  ToUs: z.string().regex(/AGREED/g)
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

export const FlightFare = z.object({
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
  fareClass: z.string().optional(),
  fares: z.array(FlightFare)
})

export const Flight = z.object({
  faresLeft: z.number(),
  flightKey: z.string(),
  infantsLeft: z.number(),
  regularFare: FareType.nullish(),
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
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FlightDate = z.infer<typeof FlightDate>

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
