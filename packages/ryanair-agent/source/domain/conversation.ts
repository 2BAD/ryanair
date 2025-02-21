import { randomUUID } from 'node:crypto'
import { Message, type MessageDTO, type MessageRole } from '~/domain/message.ts'

export type ConversationDTO = {
  id: string
  createdAt: Date
  messages: MessageDTO[]
}

export class Conversation {
  readonly #props: Omit<ConversationDTO, 'messages'>
  readonly #messages: Message[]

  constructor(props: ConversationDTO) {
    const { id, createdAt, messages } = props
    this.#props = { id, createdAt }
    this.#messages = messages.map(Message.reconstruct)
  }

  static create(props?: ConversationDTO): Conversation {
    return new Conversation({
      id: props?.id || randomUUID(),
      createdAt: props?.createdAt || new Date(),
      messages: props?.messages || []
    })
  }

  static reconstruct(props: ConversationDTO): Conversation {
    props.messages = props.messages.map(Message.reconstruct)
    return new Conversation(props)
  }

  addMessage(role: MessageRole, content: string): Message {
    const message = Message.create({ role, content, conversationId: this.#props.id })
    this.#messages.push(message)
    return message
  }
  get id(): string {
    return this.#props.id
  }

  get createdAt(): Date {
    return this.#props.createdAt
  }

  get messages(): Message[] {
    return [...this.#messages]
  }

  toDTO(): ConversationDTO {
    return {
      id: this.#props.id,
      createdAt: this.#props.createdAt,
      messages: this.#messages.map((message) => message.toDTO())
    }
  }
}
