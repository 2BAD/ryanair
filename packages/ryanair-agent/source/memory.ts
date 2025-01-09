import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { randomUUID } from 'node:crypto'
import { Message, MessageSchema, type MessageDTO, type MessageRole } from './message.ts'

type Conversation = {
  id: string
  createdAt: string
  messages: MessageDTO[]
}

type DatabaseSchema = {
  conversations: Conversation[]
}

export class MessageStore {
  private static instance: MessageStore | null = null
  private db: Low<DatabaseSchema>
  private initialized = false

  private constructor(filePath: string) {
    const adapter = new JSONFile<DatabaseSchema>(filePath)
    this.db = new Low(adapter, { conversations: [] })
  }

  static create(filePath = './db.json'): MessageStore {
    if (!MessageStore.instance) {
      MessageStore.instance = new MessageStore(filePath)
    }
    return MessageStore.instance
  }

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.db.read()
      this.initialized = true
    }
  }

  async createConversation(): Promise<string> {
    await this.ensureInitialized()

    const conversationId = randomUUID()
    const conversation: Conversation = {
      id: conversationId,
      createdAt: new Date().toISOString(),
      messages: []
    }

    this.db.data.conversations.push(conversation)
    await this.db.write()
    return conversationId
  }

  async addMessage(conversationId: string, role: MessageRole, content: string): Promise<Message> {
    await this.ensureInitialized()

    const message = Message.create({
      role,
      content,
      conversationId
    })

    const conversation = this.db.data.conversations.find((c) => c.id === conversationId)
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`)
    }

    conversation.messages.push(MessageSchema.toDTO(message))
    await this.db.write()
    return message
  }

  async getConversation(conversationId: string): Promise<Conversation | undefined> {
    await this.ensureInitialized()
    return this.db.data.conversations.find((c) => c.id === conversationId)
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    await this.ensureInitialized()
    const conversation = await this.getConversation(conversationId)
    return (conversation?.messages || []).map(MessageSchema.toDomain)
  }

  async getAllConversations(): Promise<Conversation[]> {
    await this.ensureInitialized()
    return this.db.data.conversations
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await this.ensureInitialized()
    const index = this.db.data.conversations.findIndex((c) => c.id === conversationId)
    if (index !== -1) {
      this.db.data.conversations.splice(index, 1)
      await this.db.write()
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize()
    }
  }
}
