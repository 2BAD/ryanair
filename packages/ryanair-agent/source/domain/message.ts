import { randomUUID } from 'node:crypto'
import type { SetOptional } from 'type-fest'

export type MessageRole = 'user' | 'assistant'

export type MessageProps = {
  id: string
  role: MessageRole
  content: string
  date: Date
  conversationId: string
}

export class Message {
  readonly #props: MessageProps

  private constructor(props: MessageProps) {
    this.#props = props
  }

  static create(props: SetOptional<MessageProps, 'id' | 'date'>): Message {
    return new Message({
      ...props,
      id: props.id || randomUUID(),
      date: props.date || new Date()
    })
  }

  static reconstruct(props: MessageProps): Message {
    return new Message(props)
  }

  get id(): string {
    return this.#props.id
  }

  get role(): MessageRole {
    return this.#props.role
  }

  get content(): string {
    return this.#props.content
  }

  get date(): Date {
    return this.#props.date
  }

  get conversationId(): string {
    return this.#props.conversationId
  }
}
