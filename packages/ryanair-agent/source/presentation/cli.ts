/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable n/no-process-exit */
import chalk from 'chalk'
import ora from 'ora'
// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts'
import type { ChatService } from '~/application/chat/chatService.ts'

// biome-ignore lint/style/useNamingConvention:
export class CLI {
  readonly #chatService: ChatService

  constructor(chatService: ChatService) {
    this.#chatService = chatService
  }

  async start(): Promise<void> {
    console.log(chalk.cyan('🤖 Welcome to the LLM Chat CLI!'))
    console.log(chalk.gray('Type "exit" to end the conversation'))
    console.log(chalk.gray('Use /temp <0-1> to adjust temperature\n'))

    let temperature = 0.7

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

      if (message.startsWith('/temp ')) {
        const newTemp = Number.parseFloat(message.split(' ')[1])
        if (newTemp >= 0 && newTemp <= 1) {
          temperature = newTemp
          console.log(chalk.green(`Temperature set to ${temperature}`))
        } else {
          console.log(chalk.red('Temperature must be between 0 and 1'))
        }
        continue
      }

      const spinner = ora({
        text: 'Thinking...',
        color: 'blue'
      }).start()

      try {
        const response = await this.#chatService.sendMessage(message, {
          temperature
        })
        spinner.succeed(chalk.blue('Assistant: ') + response)
      } catch (error) {
        spinner.fail(chalk.red('Failed to get response'))
        console.error(chalk.red('Error: '), error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }
}
