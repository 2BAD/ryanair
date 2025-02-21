import { DomainError } from '~/domain/shared/errors/domainError.ts'

export class CompletionError extends DomainError {
  constructor(
    message: string,
    options?: ErrorOptions & {
      code?: string
      attempts?: number
      model?: string
    }
  ) {
    const { code, ...rest } = options || {}
    super(message, code || 'COMPLETION_ERROR', rest)
  }

  static modelNotSupported(model: string): CompletionError {
    return new CompletionError(`Model ${model} is not supported`, { code: 'MODEL_NOT_SUPPORTED', model })
  }

  static tokenLimitExceeded(limit: number): CompletionError {
    return new CompletionError(`Token limit of ${limit} exceeded`, { code: 'TOKEN_LIMIT_EXCEEDED' })
  }

  static networkError(error: Error): CompletionError {
    return new CompletionError('Network error during completion', { code: 'NETWORK_ERROR', cause: error })
  }
}
