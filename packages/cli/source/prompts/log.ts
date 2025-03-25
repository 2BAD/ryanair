import { symbols } from './symbols.ts'

/**
 * Prettify notification messages by appending symbols
 *
 * @param text - Text that should be logged
 */
export const notify = (text: string): void => {
  console.log(`${symbols.notice} ${text}`)
}
