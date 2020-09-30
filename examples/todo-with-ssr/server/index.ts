import path from 'path'
import React from 'react'
import express from 'express'
import bodyParser from 'body-parser'
import {serverRender} from 'react-distant'

import api from './api'
import {App} from '../web/App'

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api', bodyParser.json())
app.use('/api', api)

app.get('*', async (req, res) => {
  const html = await serverRender(React.createElement(App))
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
