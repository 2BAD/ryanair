import { fares } from '@2bad/ryanair'
import { z } from 'zod'
import type { Tool } from '../utils/types.ts'

const FARES_FIND_CHEAPEST_ROUND_TRIP: Parameters<Tool> = [
  'find_cheapest_round_trip',
  'find the cheapest round trip fares for a route and date range',
  {
    from: z.string().length(3),
    to: z.string().length(3),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    currency: z.string().optional(),
    limit: z.number().min(1).max(50).optional()
  },
  async ({ from, to, startDate, endDate, currency, limit }) => {
    try {
      const data = await fares.findCheapestRoundTrip(from, to, startDate, endDate, currency, limit)
      const text = JSON.stringify(data, null, 2)
      return {
        content: [{ type: 'text', text }]
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ error: errorMessage }, null, 2) }]
      }
    }
  }
]

const FARES_FIND_DAILY_FARES_IN_RANGE: Parameters<Tool> = [
  'find_daily_fares_in_range',
  'find daily fares for a route within a specified date range',
  {
    from: z.string().length(3),
    to: z.string().length(3),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    currency: z.string().optional()
  },
  async ({ from, to, startDate, endDate, currency }) => {
    try {
      const data = await fares.findDailyFaresInRange(from, to, startDate, endDate, currency)
      const text = JSON.stringify(data, null, 2)
      return {
        content: [{ type: 'text', text }]
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ error: errorMessage }, null, 2) }]
      }
    }
  }
]

const FARES_GET_CHEAPEST_PER_DAY: Parameters<Tool> = [
  'get_cheapest_fares_per_day',
  'get the cheapest one-way fares between two airports for a given month',
  {
    from: z.string().length(3),
    to: z.string().length(3),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    currency: z.string().optional()
  },
  async ({ from, to, startDate, currency }) => {
    try {
      const data = await fares.getCheapestPerDay(from, to, startDate, currency)
      const text = JSON.stringify(data, null, 2)
      return {
        content: [{ type: 'text', text }]
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ error: errorMessage }, null, 2) }]
      }
    }
  }
]

export const FARES_TOOLS: Parameters<Tool>[] = [
  FARES_FIND_CHEAPEST_ROUND_TRIP,
  FARES_FIND_DAILY_FARES_IN_RANGE,
  FARES_GET_CHEAPEST_PER_DAY
]
