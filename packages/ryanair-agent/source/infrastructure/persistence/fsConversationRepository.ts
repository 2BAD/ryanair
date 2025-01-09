import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Conversation } from '~/domain/conversation.ts'
import type { ConversationRepository } from './conversationRepository.ts'

type DatabaseSchema = {
  conversations: Conversation[]
}

export class FSConversationRepository implements ConversationRepository {
  private static instance: FSConversationRepository | null = null
  private db: Low<DatabaseSchema>
  private initialized = false

  constructor(filePath: string) {
    const adapter = new JSONFile<DatabaseSchema>(filePath)
    this.db = new Low(adapter, { conversations: [] })
  }

  static create(filePath = './db.json'): FSConversationRepository {
    if (!FSConversationRepository.instance) {
      FSConversationRepository.instance = new FSConversationRepository(filePath)
    }
    return FSConversationRepository.instance
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.db.read()
      this.initialized = true
    }
  }

  async findById(id: string): Promise<Conversation | null> {
    await this.ensureInitialized()
    const raw = this.db.data.conversations.find((c) => c.id === id)

    if (!raw) {
      return null
    }

    return Conversation.reconstruct(raw)
  }

  async save(conversation: Conversation): Promise<void> {
    await this.ensureInitialized()
    this.db.data.conversations.push(conversation)
    await this.db.write()
  }

  async update(conversation: Conversation): Promise<void> {
    await this.ensureInitialized()
    const index = this.db.data.conversations.findIndex((c) => c.id === conversation.id)
    if (index !== -1) {
      this.db.data.conversations[index] = conversation
      await this.db.write()
    }
  }

  async delete(id: string): Promise<void> {
    await this.ensureInitialized()
    const index = this.db.data.conversations.findIndex((c) => c.id === id)
    if (index !== -1) {
      this.db.data.conversations.splice(index, 1)
      await this.db.write()
    }
  }
}
