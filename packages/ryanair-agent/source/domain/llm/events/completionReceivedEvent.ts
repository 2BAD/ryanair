import type { CompletionResponse } from '~/domain/llm/completionResponse.ts'
import type { DomainEvent } from '~/domain/shared/domainEvent.ts'

export class CompletionReceivedEvent implements DomainEvent {
  public readonly completionResponse: CompletionResponse
  public readonly timestamp: Date

  constructor(completionResponse: CompletionResponse, timestamp: Date = new Date()) {
    this.completionResponse = completionResponse
    this.timestamp = timestamp
  }
}
