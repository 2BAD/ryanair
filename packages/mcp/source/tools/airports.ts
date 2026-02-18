import { airports } from '@2bad/ryanair'
import { z } from 'zod'
import { type ToolTuple, defineTool } from '../utils/types.ts'

const AIRPORTS_CALCULATE_DISTANCE = defineTool(
  'calculate_distance',
  'calculate total distance between consecutive locations',
  {
    locations: z.array(
      z.object({
        latitude: z.number(),
        longitude: z.number()
      })
    )
  },
  async ({ locations }) => {
    try {
      const data = airports.calculateDistance(locations)
      const text = JSON.stringify({ distance: data }, null, 2)
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

const AIRPORTS_FIND_ROUTES = defineTool(
  'find_routes',
  'find available routes between two airports',
  {
    from: z.string().length(3),
    to: z.string().length(3)
  },
  async ({ from, to }) => {
    try {
      const data = await airports.findRoutes(from, to)
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

const AIRPORTS_GET_ACTIVE_V3 = defineTool(
  'get_active_airports_v3',
  'get all active airports using API v3',
  {},
  async () => {
    try {
      const data = await airports.getActiveV3()
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

const AIRPORTS_GET_ACTIVE = defineTool(
  'get_active_airports',
  'get all active airports',
  {},
  async () => {
    try {
      const data = await airports.getActive()
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

const AIRPORTS_GET_CLOSEST = defineTool(
  'get_closest_airport',
  'get the closest airport based on user ip',
  {},
  async () => {
    try {
      const data = await airports.getClosest()
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

const AIRPORTS_GET_DESTINATIONS = defineTool(
  'get_airport_destinations',
  'get available destinations from a specific airport',
  { code: z.string().length(3) },
  async ({ code }) => {
    try {
      const data = await airports.getDestinations(code)
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

const AIRPORTS_GET_INFO = defineTool(
  'get_airport_info',
  'get detailed information about a specific airport',
  { code: z.string().length(3) },
  async ({ code }) => {
    try {
      const data = await airports.getInfo(code)
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

const AIRPORTS_GET_NEARBY = defineTool(
  'get_nearby_airports',
  'get nearby airports based on user ip',
  { locale: z.string().optional() },
  async ({ locale }) => {
    try {
      const data = await airports.getNearby(locale)
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

const AIRPORTS_GET_SCHEDULES_BY_PERIOD = defineTool(
  'get_schedules_by_period',
  'get flight schedules between two airports for a specific period',
  {
    from: z.string().length(3),
    to: z.string().length(3),
    year: z.number(),
    month: z.number()
  },
  async ({ from, to, year, month }) => {
    try {
      const data = await airports.getSchedulesByPeriod(from, to, year, month)
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

const AIRPORTS_GET_SCHEDULES_BY_ROUTE = defineTool(
  'get_schedules_by_route',
  'get flight schedule between two airports',
  {
    from: z.string().length(3),
    to: z.string().length(3)
  },
  async ({ from, to }) => {
    try {
      const data = await airports.getSchedulesByRoute(from, to)
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

const AIRPORTS_GET_SCHEDULES = defineTool(
  'get_airport_schedules',
  'get all available flight schedules for a departure airport',
  { from: z.string().length(3) },
  async ({ from }) => {
    try {
      const data = await airports.getSchedules(from)
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

export const AIRPORTS_TOOLS: ToolTuple[] = [
  AIRPORTS_CALCULATE_DISTANCE,
  AIRPORTS_FIND_ROUTES,
  AIRPORTS_GET_ACTIVE_V3,
  AIRPORTS_GET_ACTIVE,
  AIRPORTS_GET_CLOSEST,
  AIRPORTS_GET_DESTINATIONS,
  AIRPORTS_GET_INFO,
  AIRPORTS_GET_NEARBY,
  AIRPORTS_GET_SCHEDULES_BY_PERIOD,
  AIRPORTS_GET_SCHEDULES_BY_ROUTE,
  AIRPORTS_GET_SCHEDULES
]
