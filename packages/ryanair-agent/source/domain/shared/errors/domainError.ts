export class DomainError extends Error {
  public readonly code?: string | undefined

  constructor(message: string, code?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = this.constructor.name
    this.code = code
  }
}
