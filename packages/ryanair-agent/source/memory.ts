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
  private db: Low<DatabaseSchema>

  constructor(filePath = './db.json') {
    const adapter = new JSONFile<DatabaseSchema>(filePath)
    this.db = new Low(adapter, { conversations: [] })
  }

  async initialize(): Promise<void> {
    await this.db.read()
  }

  async createConversation(): Promise<string> {
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
    return this.db.data.conversations.find((c) => c.id === conversationId)
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    const conversation = await this.getConversation(conversationId)
    return (conversation?.messages || []).map(MessageSchema.toDomain)
  }

  async getAllConversations(): Promise<Conversation[]> {
    return this.db.data.conversations
  }

  async deleteConversation(conversationId: string): Promise<void> {
    const index = this.db.data.conversations.findIndex((c) => c.id === conversationId)
    if (index !== -1) {
      this.db.data.conversations.splice(index, 1)
      await this.db.write()
    }
  }
}
