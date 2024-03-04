/**
 * Ensures that the provided value is an Error object. If not, creates and returns a new Error object.
 *
 * @param value - The value to ensure as an Error object.
 */
export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch {}

  const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`)
  return error
}
