import { EventEmitter } from 'node:events'
import type { DomainEvent } from '~/domain/shared/domainEvent.ts'
import type { EventBus } from '~/domain/shared/eventBus.ts'

export class InMemoryEventBus implements EventBus {
  readonly #emitter: EventEmitter

  constructor() {
    this.#emitter = new EventEmitter()
  }

  public async publish(event: DomainEvent): Promise<void> {
    const eventType = event.eventType || event.constructor.name
    this.#emitter.emit(eventType, event)
  }

  public subscribe<T extends DomainEvent>(eventType: string, handler: (event: T) => Promise<void>): void {
    this.#emitter.on(eventType, handler)
  }

  public unsubscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void {
    this.#emitter.off(eventType, handler)
  }
}
