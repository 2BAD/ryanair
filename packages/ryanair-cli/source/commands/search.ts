import { airports } from '@2bad/ryanair'
import { Args, Command, Flags } from '@oclif/core'

// eslint-disable-next-line import/no-default-export
export default class Search extends Command {
  static override description = 'describe the command here'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' })
  }

  static override args = {
    file: Args.string({ description: 'file to read' })
  }

  public async run(): Promise<void> {
    // const { args, flags } = await this.parse(Search)

    const a = await airports.getClosest()
    console.log(a)
  }
}
