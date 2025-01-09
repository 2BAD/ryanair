/* eslint-disable n/no-process-exit */
/* eslint-disable jsdoc/require-jsdoc */
import chalk from 'chalk'
import { ChatService } from '~/application/chat.ts'
import { AnthropicService } from '~/infrastructure/llm/anthropicService.ts'
import { FSConversationRepository } from '~/infrastructure/persistence/fsConversationRepository.ts'
import { CLI } from '~/presentation/cli.ts'

const ANTHROPIC_API_KEY = process.env['ANTHROPIC_API_KEY']

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error(chalk.red('Error: ANTHROPIC_API_KEY environment variable is not set'))
    process.exit(1)
  }

  const memory = new FSConversationRepository('./db.json')
  const llm = new AnthropicService(ANTHROPIC_API_KEY)
  const chat = new ChatService(llm, memory)
  const cli = new CLI(chat)

  try {
    await cli.start()
  } catch (error) {
    console.error('Fatal error: ', error)
    process.exit(1)
  }
}

await main()
