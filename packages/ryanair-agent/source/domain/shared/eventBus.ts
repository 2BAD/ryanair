import type { DomainEvent } from '~/domain/shared/domainEvent.ts'

export interface EventBus {
  publish(event: DomainEvent): Promise<void>
  subscribe<T extends DomainEvent>(eventType: string, handler: (event: T) => Promise<void>): void
  unsubscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void
}
