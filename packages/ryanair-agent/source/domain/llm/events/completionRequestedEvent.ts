import type { CompletionRequest } from '~/domain/llm/completionRequest.ts'
import type { DomainEvent } from '~/domain/shared/domainEvent.ts'

export class CompletionRequestedEvent implements DomainEvent {
  public readonly completionRequest: CompletionRequest
  public readonly timestamp: Date

  constructor(completionRequest: CompletionRequest, timestamp: Date = new Date()) {
    this.completionRequest = completionRequest
    this.timestamp = timestamp
  }
}
