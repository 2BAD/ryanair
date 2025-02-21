import { type AnthropicProvider, createAnthropic } from '@ai-sdk/anthropic'
import { type OpenAIProvider, createOpenAI } from '@ai-sdk/openai'
import { type CoreMessage, generateText } from 'ai'
import type { Message } from '~/domain/message.ts'
import type { LLMConfig } from './llmService.ts'

export class LLMProvider {
  private readonly provider: AnthropicProvider | OpenAIProvider
  private readonly providerType: 'anthropic' | 'openai'

  constructor(apiKey: string, providerType: 'anthropic' | 'openai') {
    this.providerType = providerType
    this.provider = providerType === 'anthropic' ? createAnthropic({ apiKey }) : createOpenAI({ apiKey })
  }

  async complete(messages: readonly Message[], config: LLMConfig): Promise<string> {
    try {
      const formattedMessages = this.formatMessages(messages)

      const response = await generateText({
        model: this.provider(config.model),
        messages: formattedMessages,
        temperature: config.temperature,
        maxTokens: config.maxTokens
      })

      return response.text
    } catch (error) {
      throw new Error(
        `${this.providerType.toUpperCase()} API error: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  private formatMessages(messages: readonly Message[]): CoreMessage[] {
    return messages.map((msg) => ({
      role: msg.role,
      content: [
        {
          type: 'text' as const,
          text: msg.content
        }
      ]
    }))
  }
}
