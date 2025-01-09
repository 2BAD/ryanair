import { randomUUID } from 'node:crypto'
import { Message, type MessageRole } from './message.ts'

export class Conversation {
  private readonly id: string
  private readonly createdAt: Date
  private messages: Message[] = []

  constructor(id: string, createdAt: Date, messages: Message[] = []) {
    this.id = id
    this.createdAt = createdAt
    this.messages = messages
  }

  static create(): Conversation {
    return new Conversation(randomUUID(), new Date())
  }

  addMessage(role: MessageRole, content: string): Message {
    const message = Message.create({ role, content, conversationId: this.id })
    this.messages.push(message)
    return message
  }

  getMessages(): Message[] {
    return [...this.messages]
  }

  getId(): string {
    return this.id
  }
}
