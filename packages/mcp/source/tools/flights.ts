import { flights } from '@2bad/ryanair'
import { z } from 'zod'
import { type ToolTuple, defineTool } from '../utils/types.ts'

const FLIGHTS_GET_AVAILABLE = defineTool(
  'get_available_flights',
  'get available flights between two airports with flexible options',
  {
    origin: z.string().length(3).optional(),
    destination: z.string().length(3).optional(),
    dateOut: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    dateIn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    adults: z.number().min(1).max(25).optional(),
    children: z.number().min(0).max(24).optional(),
    teens: z.number().min(0).max(24).optional(),
    infants: z.number().min(0).max(24).optional(),
    includeConnecting: z.boolean().optional(),
    roundTrip: z.boolean().optional(),
    promoCode: z.string().optional()
  },
  async (params) => {
    try {
      const apiParams: Record<string, string> = {}

      if (params.origin) {
        apiParams['Origin'] = params.origin
      }
      if (params.destination) {
        apiParams['Destination'] = params.destination
      }
      if (params.dateOut) {
        apiParams['DateOut'] = params.dateOut
      }
      if (params.dateIn) {
        apiParams['DateIn'] = params.dateIn
      }
      if (params.adults !== undefined && params.adults !== null) {
        apiParams['ADT'] = params.adults.toString()
      }
      if (params.children !== undefined && params.children !== null) {
        apiParams['CHD'] = params.children.toString()
      }
      if (params.teens !== undefined && params.teens !== null) {
        apiParams['TEEN'] = params.teens.toString()
      }
      if (params.infants !== undefined && params.infants !== null) {
        apiParams['INF'] = params.infants.toString()
      }
      if (params.includeConnecting !== undefined && params.includeConnecting !== null) {
        apiParams['IncludeConnectingFlights'] = params.includeConnecting.toString()
      }
      if (params.roundTrip !== undefined && params.roundTrip !== null) {
        apiParams['RoundTrip'] = params.roundTrip.toString()
      }
      if (params.promoCode) {
        apiParams['promoCode'] = params.promoCode
      }
      const data = await flights.getAvailable(apiParams)
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
)

const FLIGHTS_GET_DATES = defineTool(
  'get_available_flight_dates',
  'get a list of available flight dates between two airports',
  {
    from: z.string().length(3),
    to: z.string().length(3)
  },
  async ({ from, to }) => {
    try {
      const data = await flights.getDates(from, to)
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
)

export const FLIGHTS_TOOLS: ToolTuple[] = [FLIGHTS_GET_AVAILABLE, FLIGHTS_GET_DATES]
