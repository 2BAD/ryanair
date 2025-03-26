import { z } from 'zod'
import type { IataCode } from '~/airports/types.ts'
import type { StrDate } from '~/date.types.ts'

/**
 * Options for generating a Ryanair booking link
 */
export const BookingLinkOptions = z.object({
  // Origin and destination
  originIata: z.string().length(3),
  destinationIata: z.string().length(3),

  // Travel dates
  dateOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateIn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  // Passengers
  adults: z.number().int().min(1).max(25).default(1),
  teens: z.number().int().min(0).max(24).default(0),
  children: z.number().int().min(0).max(24).default(0),
  infants: z.number().int().min(0).max(24).default(0),

  // Additional options
  isConnectedFlight: z.boolean().default(false),
  isReturn: z.boolean().default(false),
  discount: z.number().int().min(0).default(0),
  promoCode: z.string().default(''),
  market: z.string().default('gb'),
  locale: z.string().default('en')
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type BookingLinkOptions = z.infer<typeof BookingLinkOptions>

/**
 * Generates a Ryanair booking link based on the provided flight data
 *
 * @param options - Options for generating the booking link
 * @returns A URL to the Ryanair booking page with the specified parameters
 *
 * @example
 * ```typescript
 * const bookingUrl = generateBookingLink({
 *   originIata: 'TGD',
 *   destinationIata: 'BER',
 *   dateOut: '2025-03-30',
 *   adults: 1
 * });
 * ```
 */
export const generateBookingLink = (options: Partial<BookingLinkOptions>): string => {
  // Set default options
  const defaults: BookingLinkOptions = {
    originIata: options.originIata || '',
    destinationIata: options.destinationIata || '',
    dateOut: options.dateOut || '',
    adults: 1,
    teens: 0,
    children: 0,
    infants: 0,
    isConnectedFlight: false,
    isReturn: false,
    discount: 0,
    promoCode: '',
    market: 'gb',
    locale: 'en'
  }

  // Merge with provided options
  const params = { ...defaults, ...options }

  // Validate parameters
  const validatedParams = BookingLinkOptions.parse(params)

  // Build URL parameters
  const urlParams = new URLSearchParams()
  urlParams.set('adults', validatedParams.adults.toString())
  urlParams.set('teens', validatedParams.teens.toString())
  urlParams.set('children', validatedParams.children.toString())
  urlParams.set('infants', validatedParams.infants.toString())
  urlParams.set('dateOut', validatedParams.dateOut)
  urlParams.set('dateIn', validatedParams.dateIn || '')
  urlParams.set('isConnectedFlight', validatedParams.isConnectedFlight.toString())
  urlParams.set('discount', validatedParams.discount.toString())
  urlParams.set('isReturn', validatedParams.isReturn.toString())
  urlParams.set('promoCode', validatedParams.promoCode)
  urlParams.set('originIata', validatedParams.originIata)
  urlParams.set('destinationIata', validatedParams.destinationIata)

  // Build the full URL
  return `https://www.ryanair.com/${validatedParams.market}/${validatedParams.locale}/trip/flights/select?${urlParams.toString()}`
}

/**
 * Generates a booking link for a one-way flight
 *
 * @param from - The IATA code of the departure airport
 * @param to - The IATA code of the arrival airport
 * @param dateOut - The departure date in YYYY-MM-DD format
 * @param adults - Number of adults (default: 1)
 * @param options - Additional booking options
 */
export const generateOneWayBookingLink = (
  from: IataCode,
  to: IataCode,
  dateOut: StrDate,
  adults = 1,
  options: Partial<BookingLinkOptions> = {}
): string => {
  return generateBookingLink({
    originIata: from,
    destinationIata: to,
    dateOut,
    adults,
    isReturn: false,
    ...options
  })
}

/**
 * Generates a booking link for a return flight
 *
 * @param from - The IATA code of the departure airport
 * @param to - The IATA code of the arrival airport
 * @param dateOut - The departure date in YYYY-MM-DD format
 * @param dateIn - The return date in YYYY-MM-DD format
 * @param adults - Number of adults (default: 1)
 * @param options - Additional booking options
 */
export const generateReturnBookingLink = (
  from: IataCode,
  to: IataCode,
  dateOut: StrDate,
  dateIn: StrDate,
  adults = 1,
  options: Partial<BookingLinkOptions> = {}
): string => {
  return generateBookingLink({
    originIata: from,
    destinationIata: to,
    dateOut,
    dateIn,
    adults,
    isReturn: true,
    ...options
  })
}
