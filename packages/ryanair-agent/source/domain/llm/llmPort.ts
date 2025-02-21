import type { CompletionRequest } from '~/domain/llm/completionRequest.ts'
import type { CompletionResponse } from '~/domain/llm/completionResponse.ts'

export interface LLMPort {
  complete(request: CompletionRequest): Promise<CompletionResponse>
  estimateTokens(text: string): number
}
