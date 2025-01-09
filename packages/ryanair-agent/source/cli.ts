/* eslint-disable n/no-process-exit */
/* eslint-disable jsdoc/require-jsdoc */
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
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

  console.log(chalk.cyan('🤖 Welcome to the LLM Chat CLI!'))
  console.log(chalk.gray('Type "exit" to end the conversation\n'))

  while (true) {
    const { message } = await prompts(
      {
        type: 'text',
        name: 'message',
        message: 'You:',
        validate: (value) => value.trim().length > 0 || 'Please enter a message'
      },
      {
        onCancel: () => {
          console.log(chalk.yellow('\nOperation cancelled'))
          process.exit(0)
        }
      }
    )

    if (message.toLowerCase() === 'exit') {
      console.log(chalk.yellow('\nGoodbye! 👋'))
      process.exit(0)
    }

    const spinner = ora({
      text: 'Thinking...',
      color: 'blue'
    }).start()

    try {
      const response = await anthropic.sendMessage(conversationId, message)
      spinner.succeed(chalk.blue('Assistant: ') + response)
    } catch (error) {
      spinner.fail(chalk.red('Failed to get response'))
      console.error(chalk.red('Fatal error: '), error instanceof Error ? error.message : 'Unknown error')
    }
  }
}

try {
  await main()
} catch (error) {
  console.error(chalk.red('Fatal error: '), error instanceof Error ? error.message : 'Unknown error')
  process.exit(1)
}
