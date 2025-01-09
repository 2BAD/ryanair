/* eslint-disable n/no-process-exit */
/* eslint-disable jsdoc/require-jsdoc */
import { cancel, intro, isCancel, log, outro, spinner, text } from '@clack/prompts'
import chalk from 'chalk'
import { AnthropicService } from './llm.ts'
import { MessageStore } from './memory.ts'

const ANTHROPIC_API_KEY = process.env['ANTHROPIC_API_KEY']

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error(chalk.red('Error: ANTHROPIC_API_KEY environment variable is not set'))
    process.exit(1)
  }

  const anthropic = new AnthropicService(ANTHROPIC_API_KEY, MessageStore.create())
  const conversationId = await anthropic.createConversation()

  intro(chalk.cyan('🤖 Welcome to the LLM Chat CLI!'))
  log.info(chalk.gray('Type "exit" to end the conversation\n'))

  while (true) {
    const message = await text({
      message: 'You:',
      validate(value) {
        return value.trim().length === 0 ? 'Please enter a message' : undefined
      }
    })

    // Handle cancellation (Ctrl+C)
    if (isCancel(message)) {
      cancel('Operation cancelled')
      process.exit(0)
    }

    if (message.toLowerCase() === 'exit') {
      outro(chalk.yellow('Goodbye! 👋'))
      process.exit(0)
    }

    const thinking = spinner()
    thinking.start('Thinking...')
    try {
      const response = await anthropic.sendMessage(conversationId, message)
      thinking.stop(`${chalk.blue('Assistant:')} ${response}`)
    } catch (error) {
      thinking.stop(chalk.red('Failed to get response'))
      log.error(`${chalk.red('Fatal error: ')} ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}

try {
  await main()
} catch (error) {
  log.error(`${chalk.red('Fatal error: ')} ${error instanceof Error ? error.message : 'Unknown error'}`)
  process.exit(1)
}
