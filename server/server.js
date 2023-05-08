const { Console } = require('console')
const http = require('http')
const url = require('url')
const request = require('./request')

// console.log('argv', require('minimist')(process.argv.slice(2)))

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(request)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
