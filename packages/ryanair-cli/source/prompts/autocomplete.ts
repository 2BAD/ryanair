import type { Choice, PromptObject } from 'prompts'

type KVList<T extends string> = [keys: string[], values?: T[]]

/**
 * Converts keys and values arrays into an array of Choice objects.
 *
 * @param keys - Array of keys (titles)
 * @param values - Optional array of values
 */
export const kvToChoices = <T extends string>(keys: string[], values?: T[]): Choice[] => {
  return keys.map((k, i) => ({
    title: k,
    value: values?.[i]
  }))
}

/**
 * Generates an Autocomplete prompt object.
 *
 * @param name - Name of the variable to store the answer
 * @param KVList - Key-Value list for autocomplete choices
 * @param initial - Default initial value
 * @param exhaust - Flag indicating whether to filter choices based on previous answers
 */
export const autocomplete = (
  name: string,
  KVList: KVList<string>,
  initial?: string | number,
  exhaust = false
): PromptObject => {
  const choices: Choice[] = kvToChoices(...KVList)
  return {
    type: 'autocomplete',
    name,
    message: `Select ${name}`,
    initial,
    // eslint-disable-next-line jsdoc/require-jsdoc
    choices: (prev) => (exhaust ? choices.filter((c) => c.value !== prev) : choices)
  }
}
