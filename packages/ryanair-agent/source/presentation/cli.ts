/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable n/no-process-exit */
import chalk from 'chalk'
import ora from 'ora'
// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts'
import type { ChatService } from '~/application/chat.ts'

// biome-ignore lint/style/useNamingConvention:
export class CLI {
  private readonly chatService: ChatService

  constructor(chatService: ChatService) {
    this.chatService = chatService
  }

  async start(): Promise<void> {
    console.log(chalk.cyan('🤖 Welcome to the LLM Chat CLI!'))
    console.log(chalk.gray('Type "exit" to end the conversation\n'))

    while (true) {
      const { message } = await prompts(
        {
          type: 'text',
          name: 'message',
          message: 'You:',
          validate: (value: string) => value.trim().length > 0 || 'Please enter a message'
        },
        {
          onCancel: () => {
            console.log(chalk.yellow('\n👋 until next time!'))
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
        const response = await this.chatService.sendMessage(message)
        spinner.succeed(chalk.blue('Assistant: ') + response)
      } catch (error) {
        spinner.fail(chalk.red('Failed to get response'))
        console.error(chalk.red('Fatal error: '), error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }
}
