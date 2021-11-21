export const titleCaseString = (input: string): string => {
  return input
    .split(' ')
    .map((word: string) => {
      return word.length === 1 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)
    })
    .join(' ')
}