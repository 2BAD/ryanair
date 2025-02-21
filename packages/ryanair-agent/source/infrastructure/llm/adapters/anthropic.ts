import type { CompletionRequest } from '~/domain/llm/completionRequest.ts'
import { CompletionResponse } from '~/domain/llm/completionResponse.ts'
import type { LLMPort } from '~/domain/llm/llmPort.ts'
import type { Message } from '~/domain/message.ts'

export class AnthropicAdapter implements LLMPort {
  constructor(
    private readonly client: AnthropicClient,
    private readonly logger: Logger
  ) {}

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    try {
      const response = await this.client.complete({
        messages: this.formatMessages(request.messages),
        ...request.config
      })

      return CompletionResponse.create(
        response.content,
        TokenUsage.create(response.usage.prompt_tokens, response.usage.completion_tokens),
        response.finish_reason
      )
    } catch (error) {
      this.logger.error('Anthropic API error', { error })
      throw new LLMProviderError('Failed to get completion from Anthropic', { cause: error })
    }
  }

  estimateTokens(text: string): number {
    return this.client.countTokens(text)
  }

  private formatMessages(messages: readonly Message[]): AnthropicMessage[] {
    return messages.map((msg) => ({
      role: msg.role,
      content: msg.content
    }))
  }
}
