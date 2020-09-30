import React from 'react'
import {Cache} from './classes'

export const defaultCache = new Cache()
export const CacheContext = React.createContext(defaultCache)
export const CacheProvider = CacheContext.Provider

try {
  if (window && (window as any).__REACT_DISTANT_DATA__) {
    defaultCache.setData((window as any).__REACT_DISTANT_DATA__)
  }
} catch {}
