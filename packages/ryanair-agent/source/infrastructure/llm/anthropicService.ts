import Anthropic from '@anthropic-ai/sdk'
import type { Message } from '~/domain/message.ts'
import type { LLMService } from './llmService.ts'

export type AnthropicConfig = {
  model: string
  // biome-ignore lint/style/useNamingConvention: external props
  max_tokens: number
  temperature: number
  system?: string
}

export class AnthropicService implements LLMService {
  private anthropic: Anthropic
  private config: AnthropicConfig

  constructor(apiKey: string, config: Partial<AnthropicConfig> = {}) {
    this.anthropic = new Anthropic({ apiKey })
    this.config = {
      model: 'claude-3-5-haiku-latest',
      // biome-ignore lint/style/useNamingConvention: external props
      max_tokens: 1000,
      temperature: 0,
      ...config
    }
  }

  async complete(messages: Message[]): Promise<string> {
    const response = await this.anthropic.messages.create({
      ...this.config,
      messages: this.formatMessages(messages)
    })

    return response?.content[0]?.type === 'text' ? response.content[0].text : ''
  }

  private formatMessages(messages: Message[]): Anthropic.Messages.MessageParam[] {
    return messages.map((message) => ({
      role: message.role,
      content: [
        {
          type: 'text',
          text: message.content
        }
      ]
    }))
  }
}
