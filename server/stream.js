/**
 * 流
 */
const http = require('http')
const fs = require('fs')

const server = http.createServer(function (req, res) {
  console.log('req.url', req.url)

  const stream = fs.createReadStream(__dirname + '/test.txt')
  stream.pipe(res)

  // fs.readFile(__dirname + '/test.txt', (err, data) => {
  //   console.log('file data', data.toString())
  //   res.end(data)
  // })
})
server.listen(3000, () => {
  console.log('server run on port 3000')
})
