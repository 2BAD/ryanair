/* eslint-disable jsdoc/require-jsdoc */
import { ChatService } from '~/application/chat/chatService.ts'
import { CompletionService } from '~/application/llm/completionService.ts'
import type { EventBus } from '~/domain/shared/eventBus.ts'
import { AnthropicAdapter } from '~/infrastructure/llm/adapters/anthropic.ts'
import { FSConversationRepository } from '~/infrastructure/persistence/fsConversationRepository.ts'
import { CLI } from '~/presentation/cli.ts'
import type { CompletionReceivedEvent } from './domain/llm/events/completionReceivedEvent.ts'
import type { CompletionRequestedEvent } from './domain/llm/events/completionRequestedEvent.ts'
import { InMemoryEventBus } from './infrastructure/eventBus/inMemoryEventBus.ts'

async function setupEventHandlers(eventBus: EventBus, logger: { info: (message: string, data?: unknown) => void }) {
  // Subscribe to completion requested events
  eventBus.subscribe<CompletionRequestedEvent>('CompletionRequestedEvent', async (event) => {
    logger.info('LLM completion requested', {
      model: event.completionRequest.config.model,
      timestamp: event.timestamp
    })
  })

  // Subscribe to completion received events
  eventBus.subscribe<CompletionReceivedEvent>('CompletionReceivedEvent', async (event) => {
    logger.info('LLM completion received', {
      tokens: event.completionResponse.usage.total,
      finishReason: event.completionResponse.finishReason,
      timestamp: event.timestamp
    })
  })
}

async function main() {
  // Setup infrastructure
  const eventBus = new InMemoryEventBus()
  const anthropicClient = new AnthropicClient({
    apiKey: process.env.ANTHROPIC_API_KEY
  })

  // Create LLM adapter
  const llmAdapter = new AnthropicAdapter(anthropicClient, console)

  // Create completion service
  const completionService = new CompletionService(llmAdapter, eventBus)

  // Setup event listeners for monitoring/logging
  await setupEventHandlers(eventBus, console)

  // Create repository
  const conversationRepository = new FSConversationRepository('./db.json')

  // Create chat service
  const chatService = new ChatService(completionService, conversationRepository)

  // Create and start CLI
  const cli = new CLI(chatService)
  await cli.start()
}

await main()
