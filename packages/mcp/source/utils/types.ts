import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { ZodRawShapeCompat } from '@modelcontextprotocol/sdk/server/zod-compat.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ToolTuple = [string, string, ZodRawShapeCompat, ToolCallback<any>]

export const defineTool = <Args extends ZodRawShapeCompat>(
  name: string,
  description: string,
  paramsSchema: Args,
  cb: ToolCallback<Args>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ToolTuple => [name, description, paramsSchema, cb as ToolCallback<any>]
