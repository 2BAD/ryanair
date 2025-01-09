import type { Conversation } from '~/domain/conversation.ts'

export type ConversationRepository = {
  findById: (id: string) => Promise<Conversation | null>
  save: (conversation: Conversation) => Promise<void>
  update: (conversation: Conversation) => Promise<void>
  delete: (id: string) => Promise<void>
}
