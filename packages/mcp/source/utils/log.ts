/**
 * Logs a message to the stderr to prevent stdout from being polluted
 *
 * @param args - The data to log
 */
export const log = (...args: unknown[]) => {
  const msg = `[DEBUG ${new Date().toISOString()}] ${args.join(' ')}\n`
  process.stderr.write(msg)
}
