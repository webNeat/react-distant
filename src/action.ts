import React from 'react'
import {useIsMounted} from 'react-tidy'
import {AsyncFn} from './types'

type State<T> = {
  data?: T
  error?: any
  hasError: boolean
  isLoading: boolean
  hasBeenLoaded: boolean
}

export function action<Args extends any[], T>(fn: AsyncFn<Args, T>) {
  return () => {
    const isMounted = useIsMounted()
    const [state, setState] = React.useState<State<T>>({
      data: undefined,
      error: undefined,
      hasError: false,
      isLoading: false,
      hasBeenLoaded: false,
    })
    const run = async (...args: Args) => {
      setState((x) => ({...x, isLoading: true}))
      return fn(...args)
        .then((data) => {
          if (isMounted()) {
            setState((x) => ({...x, isLoading: false, hasBeenLoaded: true, data, error: undefined, hasError: false}))
          }
        })
        .catch((error) => {
          if (isMounted()) {
            setState((x) => ({...x, isLoading: false, hasBeenLoaded: true, data: undefined, error, hasError: true}))
          }
        })
    }
    return {...state, run}
  }
}
