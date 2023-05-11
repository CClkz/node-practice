const express = require('express')
const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/todos', (req, res) => {
  console.log('body', req.body)

  let data = ''
  req.on('data', chunk => {
    console.log('data', chunk)
    data += chunk
  })
  req.on('end', () => {
    console.log('end', data)
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('api post response')
})

app.get('/todos', (req, res) => {
  console.log('query', req.query)

  let data = ''
  req.on('data', chunk => {
    console.log('data', chunk)
    data += chunk
  })
  req.on('end', () => {
    console.log('end', data)
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('api get response')
})

app.listen(3000, '127.0.0.1', () => {
  console.log('start')
})