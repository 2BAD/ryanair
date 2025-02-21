export class TokenUsage {
  readonly #prompt: number
  readonly #completion: number
  readonly #total: number

  private constructor(prompt: number, completion: number) {
    this.#prompt = prompt
    this.#completion = completion
    this.#total = prompt + completion
  }

  static create(prompt: number, completion: number): TokenUsage {
    if (prompt < 0 || completion < 0) {
      throw new Error('Token counts must be non-negative')
    }
    return new TokenUsage(prompt, completion)
  }

  get prompt(): number {
    return this.#prompt
  }

  get completion(): number {
    return this.#completion
  }

  get total(): number {
    return this.#total
  }
}
