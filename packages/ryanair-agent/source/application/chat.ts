import { Conversation } from '~/domain/conversation.ts'
import type { LLMService } from '~/infrastructure/llm/llmService.ts'
import type { ConversationRepository } from '~/infrastructure/persistence/conversationRepository.ts'

type SendMessageOptions = {
  startNewConversation?: boolean
}

export class ChatService {
  private readonly llmService: LLMService
  private readonly conversationRepository: ConversationRepository
  private currentConversationId: string | null = null

  constructor(llmService: LLMService, conversationRepository: ConversationRepository) {
    this.llmService = llmService
    this.conversationRepository = conversationRepository
  }

  private async createNewConversation(): Promise<string> {
    const conversation = Conversation.create()
    await this.conversationRepository.save(conversation)
    this.currentConversationId = conversation.id
    return conversation.id
  }

  async sendMessage(message: string, options: SendMessageOptions = {}): Promise<string> {
    // Start new conversation if requested or if no conversation exists
    if (options.startNewConversation || !this.currentConversationId) {
      await this.createNewConversation()
    }

    const conversationId = this.currentConversationId
    if (!conversationId) {
      throw new Error('Conversation ID not found')
    }

    const conversation = await this.conversationRepository.findById(conversationId)
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`)
    }

    // Add user message and get LLM response
    conversation.addMessage('user', message)
    const response = await this.llmService.complete(conversation.messages)
    conversation.addMessage('assistant', response)

    // Save updated conversation
    await this.conversationRepository.update(conversation)

    return response
  }

  getCurrentConversationId(): string | null {
    return this.currentConversationId
  }
}
