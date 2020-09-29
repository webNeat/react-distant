const path = require('path')
const express = require('express')
const jsonServer = require('json-server')

const app = jsonServer.create()
const api = jsonServer.router(path.join(__dirname, 'db.json'))

api.use(jsonServer.defaults())
api.use(jsonServer.bodyParser)
api.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api', api)
app.get('*', (req, res) => {
  res.send(`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR demo</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
})

app.listen(3000)
