import { z } from 'zod'

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

const Coordinates = z.object({
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
  country: Country.omit({ currency: true, defaultAirportCode: true }),
  coordinates: Coordinates
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AirportShort = z.infer<typeof AirportShort>

export const ListAirportShort = z.array(AirportShort)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ListAirportShort = z.infer<typeof ListAirportShort>

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

export const Destinations = z.array(
  z.object({
    arrivalAirport: Airport,
    recent: z.boolean(),
    seasonal: z.boolean(),
    operator: z.string(),
    tags: z.array(z.string())
  })
)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Destinations = z.infer<typeof Destinations>
