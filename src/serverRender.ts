import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {CacheProvider} from './CacheProvider'
import {Cache} from './classes'
import {wait} from './functions'

export async function serverRender(element: React.ReactElement) {
  const cache = new Cache()
  let isLoading = true
  while (isLoading) {
    ReactDOMServer.renderToString(React.createElement(CacheProvider, {value: cache}, element))
    await wait(10)
    isLoading = await cache.waitLoading()
  }
  const html = ReactDOMServer.renderToString(React.createElement(CacheProvider, {value: cache}, element))
  const data = cache.getData()
  return [html, `window.__REACT_DISTANT_DATA__=${JSON.stringify(data)}`]
}
