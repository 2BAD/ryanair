import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { AIRPORTS_TOOLS } from './tools/airports.ts'
import { BOOKING_TOOLS } from './tools/booking.ts'
import { FARES_TOOLS } from './tools/fares.ts'
import { FLIGHTS_TOOLS } from './tools/flights.ts'
import { log } from './utils/log.ts'

const ALL_TOOLS = [...AIRPORTS_TOOLS, ...FLIGHTS_TOOLS, ...FARES_TOOLS, ...BOOKING_TOOLS]

const server = new McpServer(
  {
    name: 'ryanair',
    version: '1.0.0',
    description:
      'Model Context Protocol (MCP) server for Ryanair API with tools for querying flights, fares, airports, and generating booking links'
  },
  { capabilities: { tools: {} } }
)

for (const tool of ALL_TOOLS) {
  server.tool(...tool)
}

/**
 * Start the server using the stdio transport.
 */
export const main = async () => {
  log('Starting server...')
  try {
    const transport = new StdioServerTransport()
    log('Created transport')
    await server.connect(transport)
    log('Server connected and running')
  } catch (error) {
    log('Fatal error:', error)
    process.exit(1)
  }
}
