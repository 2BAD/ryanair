import { randomUUID } from 'node:crypto'

export type MessageRole = 'user' | 'assistant'

export class Message {
  private readonly id: string
  private readonly role: MessageRole
  private readonly content: string
  private readonly date: Date
  private readonly conversationId: string

  private constructor(id: string, role: MessageRole, content: string, date: Date, conversationId: string) {
    this.id = id
    this.role = role
    this.content = content
    this.date = date
    this.conversationId = conversationId
  }

  static create(props: { role: MessageRole; content: string; conversationId: string }): Message {
    return new Message(randomUUID(), props.role, props.content, new Date(), props.conversationId)
  }

  getRole(): MessageRole {
    return this.role
  }

  getContent(): string {
    return this.content
  }
}
