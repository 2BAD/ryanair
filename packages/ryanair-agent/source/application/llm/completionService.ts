import { type CompletionConfig, CompletionRequest } from '~/domain/llm/completionRequest.ts'
import { CompletionError } from '~/domain/llm/errors/CompletionError.ts'
import { CompletionReceivedEvent } from '~/domain/llm/events/completionReceivedEvent.ts'
import { CompletionRequestedEvent } from '~/domain/llm/events/completionRequestedEvent.ts'
import type { LLMPort } from '~/domain/llm/llmPort.ts'
import type { Message } from '~/domain/message.ts'
import type { EventBus } from '~/domain/shared/eventBus.ts'

export class CompletionService {
  readonly #llmPort: LLMPort
  readonly #eventBus: EventBus

  constructor(llmPort: LLMPort, eventBus: EventBus) {
    this.#llmPort = llmPort
    this.#eventBus = eventBus
  }

  async complete(messages: readonly Message[], config: CompletionConfig): Promise<string> {
    const request = CompletionRequest.create(messages, config)
    await this.#eventBus.publish(new CompletionRequestedEvent(request))

    try {
      const response = await this.#llmPort.complete(request)
      await this.#eventBus.publish(new CompletionReceivedEvent(response))

      if (!response.wasCompletedSuccessfully()) {
        throw new CompletionError(`Completion failed: ${response.finishReason}`)
      }

      return response.content
    } catch (error) {
      throw new CompletionError('Failed to get completion', {
        cause: error
      })
    }
  }
}
