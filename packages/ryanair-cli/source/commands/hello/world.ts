import { Command } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class World extends Command {
  static override args = {}

  static override description = 'Say hello world'

  static override examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`
  ]

  static override flags = {}

  async run(): Promise<void> {
    this.log('hello world! (./src/commands/hello/world.ts)')
    await Promise.resolve()
  }
}
