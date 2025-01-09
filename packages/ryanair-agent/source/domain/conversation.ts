import { randomUUID } from 'node:crypto'
import { Message, type MessageRole } from './message.ts'

export type ConversationProps = {
  id: string
  createdAt: Date
  messages: Message[]
}

export class Conversation {
  readonly #props: ConversationProps

  constructor(props: ConversationProps) {
    this.#props = props
  }

  static create(props?: ConversationProps): Conversation {
    return new Conversation({
      id: props?.id || randomUUID(),
      createdAt: props?.createdAt || new Date(),
      messages: props?.messages || []
    })
  }

  static reconstruct(props: ConversationProps): Conversation {
    props.messages = props.messages.map(Message.reconstruct)
    return new Conversation(props)
  }

  addMessage(role: MessageRole, content: string): Message {
    const message = Message.create({ role, content, conversationId: this.#props.id })
    this.#props.messages.push(message)
    return message
  }
  get id(): string {
    return this.#props.id
  }

  get createdAt(): Date {
    return this.#props.createdAt
  }

  get messages(): Message[] {
    return [...this.#props.messages]
  }
}
