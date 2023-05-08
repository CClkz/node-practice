const { Console } = require('console')
const http = require('http')
const url = require('url')
const request = require('./request')

// console.log('argv', require('minimist')(process.argv.slice(2)))

const hostname = '127.0.0.1'
const port = 3000

// 和express区别，在获取到请求头之后、获取请求正文之前调用request，所以这时是拿不到req.body的，通过监听on'data'
const server = http.createServer(request)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
