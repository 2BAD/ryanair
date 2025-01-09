import type { Message } from '~/domain/message.ts'

export type LLMService = {
  complete: (messages: Message[]) => Promise<string>
}
