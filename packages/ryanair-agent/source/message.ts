import { randomUUID } from 'node:crypto'

export type MessageRole = 'user' | 'assistant'

export type MessageProps = {
  id: string
  role: MessageRole
  content: string
  date: Date
  conversationId: string
}

export class Message {
  private readonly props: MessageProps

  private constructor(props: MessageProps) {
    this.props = props
  }

  static create(props: Omit<MessageProps, 'id' | 'date'>): Message {
    return new Message({
      ...props,
      id: randomUUID(),
      date: new Date()
    })
  }

  static reconstruct(props: MessageProps): Message {
    return new Message(props)
  }

  get id(): string {
    return this.props.id
  }

  get role(): MessageRole {
    return this.props.role
  }

  get content(): string {
    return this.props.content
  }

  get date(): Date {
    return this.props.date
  }

  get conversationId(): string {
    return this.props.conversationId
  }
}

export type MessageDTO = {
  id: string
  role: MessageRole
  content: string
  date: string
  conversationId: string
}

export const MessageSchema = {
  /**
   * Converts a `Message` domain object to a `MessageDTO` data transfer object.
   *
   * @param domain - The `Message` domain object to be converted.
   */
  toDTO(domain: Message): MessageDTO {
    return {
      id: domain.id,
      role: domain.role,
      content: domain.content,
      date: domain.date.toISOString(),
      conversationId: domain.conversationId
    }
  },

  /**
   * Converts a `MessageDTO` data transfer object to a `Message` domain object.
   *
   * @param dto - The `MessageDTO` data transfer object to be converted.
   */
  toDomain(dto: MessageDTO): Message {
    return Message.reconstruct({
      id: dto.id,
      role: dto.role,
      content: dto.content,
      date: new Date(dto.date),
      conversationId: dto.conversationId
    })
  }
}
