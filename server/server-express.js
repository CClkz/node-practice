const express = require('express')
const { json } = require('stream/consumers')
const app = express()

// 中间件
// 解析表单格式的请求体数据，并将解析后的 JSON 数据存储到 req.body 中
app.use(
  express.urlencoded({
    extended: true
  })
)
// 用于解析 application/json 格式的请求体，并将解析后的 JSON 数据存储到 req.body 中
app.use(express.json())

app.post('/todos', (req, res) => {
  console.log('body', req.body)

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  // end() json() 都是添加res.data数据,
  // end()传string or an instance of Buffer or Uint8Array
  // json()传json
  // res.end('api post response')
  res.json({ message: 'ok' })
})

app.get('/todos', (req, res) => {
  console.log('query', req.query)

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('api get response')
})

app.listen(3000, '127.0.0.1', () => {
  console.log('start at 127.0.0.1:3000')
})
