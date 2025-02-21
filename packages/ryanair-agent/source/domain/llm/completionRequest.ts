import type { Message } from '~/domain/message.ts'

export type CompletionConfig = {
  temperature: number
  maxTokens: number
  model: string
} & Record<string, unknown>

export class CompletionRequest {
  readonly #messages: readonly Message[]
  readonly #config: CompletionConfig

  private constructor(messages: readonly Message[], config: CompletionConfig) {
    this.#messages = messages
    this.#config = this.validateConfig(config)
  }

  static create(messages: readonly Message[], config: CompletionConfig): CompletionRequest {
    return new CompletionRequest(messages, config)
  }

  private validateConfig(config: CompletionConfig): CompletionConfig {
    if (config.temperature < 0 || config.temperature > 1) {
      throw new Error('Temperature must be between 0 and 1')
    }
    if (config.maxTokens < 1) {
      throw new Error('MaxTokens must be positive')
    }
    return config
  }

  get messages(): readonly Message[] {
    return this.#messages
  }

  get config(): CompletionConfig {
    return { ...this.#config }
  }
}
