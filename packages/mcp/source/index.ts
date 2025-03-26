import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { AIRPORTS_TOOLS } from './tools/airports.ts'
import { BOOKING_TOOLS } from './tools/booking.ts'
import { FARES_TOOLS } from './tools/fares.ts'
import { FLIGHTS_TOOLS } from './tools/flights.ts'

const ALL_TOOLS = [...AIRPORTS_TOOLS, ...FLIGHTS_TOOLS, ...FARES_TOOLS, ...BOOKING_TOOLS]

const server = new McpServer({ name: 'ryanair', version: '1.0.0' }, { capabilities: { tools: {} } })

for (const tool of ALL_TOOLS) {
  server.tool(...tool)
}

const transport = new StdioServerTransport()
await server.connect(transport)
