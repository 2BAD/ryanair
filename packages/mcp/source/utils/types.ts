import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { ZodRawShape } from 'zod'

export type Tool = <Args extends ZodRawShape>(
  name: string,
  description: string,
  paramsSchema: Args,
  cb: ToolCallback<Args>
) => void
