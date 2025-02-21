import type { tool } from 'ai'
import type { Message } from '~/domain/message.ts'
import { LLMProvider } from './llmProvider.ts'

export type LLMConfig = {
  readonly model: string
  readonly system?: string
  readonly tools?: readonly (typeof tool)[]
  readonly temperature: number
  readonly maxTokens: number
}

const DEFAULT_CONFIG: LLMConfig = {
  model: 'gpt-3.5-turbo',
  tools: [],
  temperature: 0,
  maxTokens: 1000
} as const

export class LLMService {
  private readonly provider: LLMProvider
  private readonly defaultConfig: Partial<LLMConfig>

  constructor(apiKey: string, providerType: 'anthropic' | 'openai', defaultConfig: Partial<LLMConfig> = {}) {
    this.provider = new LLMProvider(apiKey, providerType)
    this.defaultConfig = defaultConfig
  }

  async complete(messages: readonly Message[], configOverride: Partial<LLMConfig> = {}): Promise<string> {
    const config: LLMConfig = {
      ...DEFAULT_CONFIG,
      ...this.defaultConfig,
      ...configOverride
    }

    return this.provider.complete(messages, config)
  }
}
