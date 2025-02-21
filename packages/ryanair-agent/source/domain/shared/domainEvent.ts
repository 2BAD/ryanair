export interface DomainEvent {
  readonly timestamp: Date
  readonly eventType?: string
}
