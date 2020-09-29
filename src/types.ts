export type AsyncFn<Args extends any[], T> = (...args: Args) => Promise<T>
export type Lazy<T> = T | (() => T)
export type StrMap<T> = {
  [key: string]: T
}
