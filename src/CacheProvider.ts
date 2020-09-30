import React from 'react'
import {Cache} from './classes'

export function createCache() {
  return new Cache()
}
export const defaultCache = new Cache()
export const CacheContext = React.createContext(defaultCache)
export const CacheProvider = CacheContext.Provider
