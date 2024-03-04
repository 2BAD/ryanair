import { symbols } from './symbols.ts'

/**
 *
 * @param text
 */
export const notify = (text: string): void => {
  console.log(`${symbols.notice} ${text}`)
}
