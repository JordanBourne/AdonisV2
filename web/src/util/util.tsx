
// idk I copy pasted this from here: https://stackoverflow.com/questions/62053739/preserve-type-when-using-object-entries
// because Object.entries returns a string as the key always otherwise
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
export function ObjectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}