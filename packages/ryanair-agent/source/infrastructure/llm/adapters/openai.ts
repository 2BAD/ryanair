import type { LLMPort } from '~/domain/llm/llmPort.ts'

export class OpenAIAdapter implements LLMPort {
  constructor(
    private readonly client: OpenAIClient,
    private readonly logger: Logger
  ) {}

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    // Similar implementation to AnthropicAdapter but for OpenAI
  }

  estimateTokens(text: string): number {
    // Implementation using OpenAI's tokenizer
    return this.client.encodingForModel(this.defaultModel).encode(text).length
  }
}
