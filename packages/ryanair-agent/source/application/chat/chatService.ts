import type { CompletionService } from '~/application/llm/completionService.ts'
import { Conversation } from '~/domain/conversation.ts'
import type { CompletionConfig } from '~/domain/llm/completionRequest.ts'
import type { ConversationRepository } from '~/infrastructure/persistence/conversationRepository.ts'

export class ChatService {
  readonly #completionService: CompletionService
  readonly #conversationRepository: ConversationRepository
  #currentConversationId: string | null = null

  constructor(completionService: CompletionService, conversationRepository: ConversationRepository) {
    this.#completionService = completionService
    this.#conversationRepository = conversationRepository
  }

  async sendMessage(message: string, config: Partial<CompletionConfig> = {}): Promise<string> {
    const conversation = await this.#getOrCreateConversation()

    conversation.addMessage('user', message)

    const defaultConfig: CompletionConfig = {
      temperature: 0.7,
      maxTokens: 1000,
      model: 'claude-3-haiku-20240307'
    }

    const response = await this.#completionService.complete(conversation.messages, { ...defaultConfig, ...config })

    conversation.addMessage('assistant', response)

    await this.#conversationRepository.update(conversation)

    return response
  }

  async #getOrCreateConversation(): Promise<Conversation> {
    if (!this.#currentConversationId) {
      const conversation = Conversation.create()
      await this.#conversationRepository.save(conversation)
      this.#currentConversationId = conversation.id
      return conversation
    }

    const conversation = await this.#conversationRepository.findById(this.#currentConversationId)
    if (!conversation) {
      throw new Error(`Conversation ${this.#currentConversationId} not found`)
    }

    return conversation
  }
}
