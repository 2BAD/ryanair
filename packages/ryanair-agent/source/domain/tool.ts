export type ToolParameter = {
  name: string
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  description: string
  required: boolean
}

export type ToolDefinition = {
  name: string
  description: string
  parameters: ToolParameter[]
}

export type ToolResult = {
  success: boolean
  result: unknown
  error?: string
}

export type Tool = ToolDefinition & {
  execute(params: Record<string, unknown>): Promise<ToolResult>
}

export class ToolRegistry {
  private tools: Map<string, Tool> = new Map()

  registerTool(tool: Tool): void {
    this.tools.set(tool.name, tool)
  }

  getTool(name: string): Tool | undefined {
    return this.tools.get(name)
  }

  getToolDefinitions(): ToolDefinition[] {
    return Array.from(this.tools.values()).map(({ name, description, parameters }) => ({
      name,
      description,
      parameters
    }))
  }
}
