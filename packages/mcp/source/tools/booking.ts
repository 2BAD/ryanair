import { helpers } from '@2bad/ryanair'
import { z } from 'zod'
import type { Tool } from '../utils/types.ts'

const BOOKING_GENERATE_LINK: Parameters<Tool> = [
  'generate_booking_link',
  'generate a Ryanair booking link based on flight details',
  {
    originIata: z.string().length(3),
    destinationIata: z.string().length(3),
    dateOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dateIn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    adults: z.number().int().min(1).max(25).optional(),
    teens: z.number().int().min(0).max(24).optional(),
    children: z.number().int().min(0).max(24).optional(),
    infants: z.number().int().min(0).max(24).optional(),
    isReturn: z.boolean().optional(),
    market: z.string().optional(),
    locale: z.string().optional()
  },
  async (params) => {
    const bookingLink = helpers.generateBookingLink(params)
    return {
      content: [{ type: 'text', text: bookingLink }]
    }
  }
]

export const BOOKING_TOOLS: Parameters<Tool>[] = [BOOKING_GENERATE_LINK]
