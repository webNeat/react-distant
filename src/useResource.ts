import React from 'react'
import {AsyncFn} from './types'
import {useRefresh} from 'react-tidy'
import {CacheContext} from './CacheProvider'
import {Store} from './classes'

export type ResourceOptions = {
  load: boolean
  reloadIfOlderThan: number
  clearCacheIfUnusedFor: number
}

let defaultOptions: ResourceOptions = {
  load: true,
  reloadIfOlderThan: 30000,
  clearCacheIfUnusedFor: 30000,
}

export function getDefaultResourceOptions() {
  return defaultOptions
}

export function setDefaultResourceOptions(options: ResourceOptions) {
  defaultOptions = {...defaultOptions, ...options}
}

export function useResource<T>(key: string, fn: AsyncFn<[], T>, callOptions: Partial<ResourceOptions> = {}) {
  const options = {...defaultOptions, ...callOptions}

  const refresh = useRefresh()
  const cache = React.useContext(CacheContext)
  if (!cache.has(key)) {
    cache.create(key)
  }
  const store = cache.get(key) as Store<T>

  React.useEffect(() => {
    store.clearTimeout()
    store.addListener(refresh)
    const state = store.get()
    const isOld = state.timestamp < Date.now() - options.reloadIfOlderThan
    if (options.load && !state.isLoading && (!state.hasBeenLoaded || isOld)) {
      store.run(fn, [])
    }
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
    if (!state.isLoading) store.run(fn, [])
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

export function resource<Args extends any[], T>(
  fnKey: string,
  fn: AsyncFn<Args, T>,
  fnOptions: Partial<ResourceOptions> = {}
) {
  return (args: Args = [] as any, callOptions: Partial<ResourceOptions> = {}) =>
    useResource(JSON.stringify([fnKey, args]), () => fn(...args), {...fnOptions, ...callOptions})
}
