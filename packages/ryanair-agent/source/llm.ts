import { Anthropic } from '@anthropic-ai/sdk'
import type { MessageStore } from './memory.ts'

type AnthropicConfig = {
  model: string
  // biome-ignore lint/style/useNamingConvention: external props
  max_tokens: number
  temperature: number
  system?: string
}

export class AnthropicService {
  private anthropic: Anthropic
  private messageStore: MessageStore
  private defaultConfig: AnthropicConfig

  constructor(apiKey: string, messageStore: MessageStore, config: Partial<AnthropicConfig> = {}) {
    this.anthropic = new Anthropic({
      apiKey
    })
    this.messageStore = messageStore
    this.defaultConfig = {
      model: 'claude-3-5-haiku-latest',
      // biome-ignore lint/style/useNamingConvention: external props
      max_tokens: 1000,
      temperature: 0,
      ...config
    }
  }

  private formatMessagesForAnthropic(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Anthropic.Messages.MessageParam[] {
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

  async sendMessage(conversationId: string, userMessage: string, config: Partial<AnthropicConfig> = {}) {
    await this.messageStore.addMessage(conversationId, 'user', userMessage)

    const conversationHistory = await this.messageStore.getConversationMessages(conversationId)

    const anthropicMessages = this.formatMessagesForAnthropic(
      conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))
    )

    const finalConfig = {
      ...this.defaultConfig,
      ...config
    }

    const response = await this.anthropic.messages.create({
      ...finalConfig,
      messages: anthropicMessages
    })

    const assistantMessage = response?.content[0]?.type === 'text' ? response?.content[0]?.text : ''
    await this.messageStore.addMessage(conversationId, 'assistant', assistantMessage)

    return assistantMessage
  }

  async createConversation(): Promise<string> {
    return this.messageStore.createConversation()
  }

  async getConversationHistory(conversationId: string) {
    return this.messageStore.getConversationMessages(conversationId)
  }
}
