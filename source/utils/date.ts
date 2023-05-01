/**
 * Calculates the date for the next day in 'YYYY-MM-DD' format.
 * @returns {string} The formatted date for tomorrow.
 */

export const tomorrow = (): string => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 1)

  // Format the date into 'YYYY-MM-DD' format
  return currentDate.toISOString().slice(0, 10)
}
