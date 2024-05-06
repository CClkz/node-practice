/**
 * 流
 * 逐个片段读取并处理,无需全部保存在内存中
 * 所有流都是EventEmitter的实例
 * Readable
 * Writable
 * Duplex
 * Transform
 */
const http = require('http')
const fs = require('fs')

const server = http.createServer(function (req, res) {
  console.log('req.url', req.url)
  console.log('-----------------------------')
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // // 典型案例，读取文件
  // const stream = fs.createReadStream(__dirname + '/test.txt')
  // // 获取来源流，并将其通过管道传输到目标流，（返回目标流，即res）
  // stream.pipe(res)

  fs.readFile(__dirname + '/test.txt', (err, data) => {
    // data为buffer数据
    console.log('file data', data.toString())
    res.end(data)
  })
})
server.listen(3000, () => {
  console.log('server run on port 3000')
})
