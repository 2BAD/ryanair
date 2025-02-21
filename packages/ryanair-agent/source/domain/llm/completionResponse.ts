import type { TokenUsage } from '~/domain/llm/tokenUsage.ts'

export type FinishReason = 'stop' | 'length' | 'content_filter' | 'error'

export class CompletionResponse {
  readonly #content: string
  readonly #usage: TokenUsage
  readonly #finishReason: FinishReason

  private constructor(content: string, usage: TokenUsage, finishReason: FinishReason) {
    this.#content = content
    this.#usage = usage
    this.#finishReason = finishReason
  }

  static create(content: string, usage: TokenUsage, finishReason: FinishReason): CompletionResponse {
    return new CompletionResponse(content, usage, finishReason)
  }

  get content(): string {
    return this.#content
  }

  get usage(): TokenUsage {
    return this.#usage
  }

  get finishReason(): FinishReason {
    return this.#finishReason
  }

  wasCompletedSuccessfully(): boolean {
    return this.#finishReason === 'stop'
  }

  wasTruncated(): boolean {
    return this.#finishReason === 'length'
  }
}
