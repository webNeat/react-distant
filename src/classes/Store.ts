import {AsyncFn} from '../types'

export type StoreData<T = any> = {
  data?: T
  error?: any
  hasError: boolean
  isLoading: boolean
  hasBeenLoaded: boolean
  timestamp: number
  timeout?: NodeJS.Timeout
}
type Listener<T> = (value?: StoreData<T>) => void

const emptyState: StoreData = {
  data: undefined,
  error: undefined,
  hasError: false,
  hasBeenLoaded: false,
  isLoading: false,
  timestamp: 0,
}

export class Store<T> {
  protected data: StoreData<T> = emptyState
  protected listeners: Set<Listener<T>> = new Set()

  get() {
    return this.data
  }

  set(value: Partial<StoreData<T>>) {
    this.data = {...this.data, ...value}
    this.listeners.forEach((fn) => fn(this.data))
  }

  hasListeners() {
    return this.listeners.size > 0
  }

  addListener(fn: Listener<T>) {
    this.listeners.add(fn)
  }

  removeListener(fn: Listener<T>) {
    this.listeners.delete(fn)
  }

  run<Args extends any[]>(fn: AsyncFn<Args, T>, args: Args) {
    this.set({isLoading: true, timestamp: Date.now()})
    fn(...args)
      .then((data) =>
        this.set({
          data,
          error: undefined,
          hasError: false,
          hasBeenLoaded: true,
          isLoading: false,
          timestamp: Date.now(),
        })
      )
      .catch((error) =>
        this.set({data: undefined, error, hasError: true, hasBeenLoaded: true, isLoading: false, timestamp: Date.now()})
      )
  }

  setTimeout(fn: () => void, ms: number) {
    this.set({timeout: setTimeout(fn, ms)})
  }

  clearTimeout() {
    const {timeout} = this.get()
    if (timeout) clearTimeout(timeout)
  }

  async wait() {
    if (!this.data.isLoading) {
      return false
    }
    const self = this
    await new Promise((resolve) => {
      function listener(value?: StoreData<any>) {
        if (value && !value.isLoading) {
          self.removeListener(listener)
          resolve()
        }
      }
      self.addListener(listener)
    })
    return true
  }
}
