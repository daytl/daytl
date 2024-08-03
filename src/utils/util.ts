/**
 * Generates a random ID.
 *
 * @returns A random ID between 1 and 100 (inclusive).
 */
export const generateRandomId = () => {
  return Math.floor(Math.random() * 100) + 1;
};
