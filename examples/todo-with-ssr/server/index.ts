import path from 'path'
import React from 'react'
import express from 'express'
import bodyParser from 'body-parser'
import ReactDOMServer from 'react-dom/server'

import api from './api'
import {App} from '../web/App'
import {CacheProvider, createCache} from 'react-distant'

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api', bodyParser.json())
app.use('/api', api)

app.get('*', async (req, res) => {
  console.log('Started!')
  const cache = createCache()
  ReactDOMServer.renderToString(React.createElement(CacheProvider, {value: cache}, React.createElement(App)))
  console.log('Waiting!')
  await cache.waitLoading()
  console.log('Rendering!')
  const html = ReactDOMServer.renderToString(
    React.createElement(CacheProvider, {value: cache}, React.createElement(App))
  )
  res.send(`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR demo</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
})

app.use((req, res, err) => {
  console.log(err)
  res.json({err})
})

app.listen(3000)
