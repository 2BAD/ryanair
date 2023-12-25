import { z } from 'zod'
import { StrDate } from '~/date.types.ts'

export const IataCode = z
  .string()
  .length(3)
  .regex(/[A-Z]/, 'Incorrect IATA code format. IATA code must contain only CAPITAL letters.')
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type IataCode = z.infer<typeof IataCode>

export const Location = z.object({
  name: z.string(),
  code: z.string(),
  macCode: z.string().optional()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Location = z.infer<typeof Location>

export const Country = z.object({
  name: z.string(),
  code: z.string(),
  currency: z.string(),
  defaultAirportCode: IataCode
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Country = z.infer<typeof Country>

export const Coordinates = z.object({
  latitude: z.number(),
  longitude: z.number()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Coordinates = z.infer<typeof Coordinates>

export const AirportShort = z.object({
  code: IataCode,
  name: z.string(),
  aliases: z.array(z.string()),
  city: Location,
  macCity: Location.optional(),
  country: Country.omit({ currency: true, defaultAirportCode: true }),
  coordinates: Coordinates
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AirportShort = z.infer<typeof AirportShort>

export const AirportConnection = z.object({
  arrivalAirport: AirportShort,
  connectingAirport: z.string().nullable(),
  operator: z.string()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AirportConnection = z.infer<typeof AirportConnection>

export const Airport = z.object({
  code: IataCode,
  name: z.string(),
  seoName: z.string(),
  aliases: z.array(z.string()),
  base: z.boolean(),
  city: Location,
  macCity: Location.optional(),
  region: Location.omit({ macCode: true }),
  country: Country,
  coordinates: Coordinates,
  timeZone: z.string()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Airport = z.infer<typeof Airport>

export const Destination = z.object({
  arrivalAirport: Airport,
  recent: z.boolean(),
  seasonal: z.boolean(),
  operator: z.string(),
  tags: z.array(z.string())
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Destination = z.infer<typeof Destination>

export const Schedule = z.object({
  firstFlightDate: StrDate,
  lastFlightDate: StrDate,
  months: z.number(),
  monthsFromToday: z.number()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Schedule = z.infer<typeof Schedule>

export const Schedules = z.record(z.string(), Schedule)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Schedules = z.infer<typeof Schedules>
