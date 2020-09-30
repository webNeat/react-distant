import React from 'react'
import {useRefresh} from 'react-tidy'
import {AsyncFn} from './types'
import {Store} from './classes'
import {CacheContext} from './CacheProvider'

export type Options = {
  load: boolean
  reloadIfOlderThan: number
  clearCacheIfUnusedFor: number
}

let defaultOptions: Options = {
  load: true,
  reloadIfOlderThan: 30000,
  clearCacheIfUnusedFor: 30000,
}

export function resource<Args extends any[], T>(fnKey: string, fn: AsyncFn<Args, T>, fnOptions: Partial<Options> = {}) {
  return (args: Args = [] as any, callOptions: Partial<Options> = {}) => {
    const key = JSON.stringify([fnKey, args])
    const options = {...defaultOptions, ...fnOptions, ...callOptions}

    const refresh = useRefresh()
    const cache = React.useContext(CacheContext)
    const initialize = () => {
      const store = cache.get(key) as Store<T>
      const state = store.get()
      const isOld = state.timestamp < Date.now() - options.reloadIfOlderThan
      if (options.load && !state.isLoading && (!state.hasBeenLoaded || isOld)) {
        store.run(fn, args)
      }
    }

    if (!cache.has(key)) {
      cache.create(key)
      initialize()
    }
    const store = cache.get(key) as Store<T>

    React.useEffect(() => {
      store.clearTimeout()
      store.addListener(refresh)
      initialize()
      return () => {
        store.removeListener(refresh)
        if (!store.hasListeners()) {
          store.setTimeout(() => cache.delete(key), options.clearCacheIfUnusedFor)
        }
      }
    }, [key])

    const {data, error, hasError, isLoading, hasBeenLoaded, timestamp} = store.get()
    const reload = () => {
      const state = store.get()
      if (!state.isLoading) store.run(fn, args)
    }
    return {
      data,
      error,
      reload,
      hasError,
      isLoading,
      timestamp,
      hasBeenLoaded,
    }
  }
}
