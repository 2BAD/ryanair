import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { ZodRawShapeCompat } from '@modelcontextprotocol/sdk/server/zod-compat.js'

// biome-ignore lint/suspicious/noExplicitAny: type erasure required for heterogeneous tool tuple
export type ToolTuple = [string, string, ZodRawShapeCompat, ToolCallback<any>] // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Helper to define an MCP tool with proper type inference for the callback parameters.
 *
 * @param name - The tool name
 * @param description - The tool description
 * @param paramsSchema - Zod schema defining the tool parameters
 * @param handler - Async callback that handles the tool invocation
 */
export const defineTool = <Args extends ZodRawShapeCompat>(
  name: string,
  description: string,
  paramsSchema: Args,
  handler: ToolCallback<Args>
  // biome-ignore lint/suspicious/noExplicitAny: type erasure required for heterogeneous tool tuple
): ToolTuple => [name, description, paramsSchema, handler as ToolCallback<any>] // eslint-disable-line @typescript-eslint/no-explicit-any
