import { helpers } from '@2bad/ryanair'
import { z } from 'zod'
import { type ToolTuple, defineTool } from '../utils/types.ts'

const BOOKING_GENERATE_LINK = defineTool(
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
    try {
      const bookingLink = helpers.generateBookingLink(params as Parameters<typeof helpers.generateBookingLink>[0])
      return {
        content: [{ type: 'text', text: bookingLink }]
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ error: errorMessage }, null, 2) }]
      }
    }
  }
)

export const BOOKING_TOOLS: ToolTuple[] = [BOOKING_GENERATE_LINK]
