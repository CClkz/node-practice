const http = require('http')

const data = JSON.stringify({
  todo: '做点事情'
})

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 注释掉length，请求正常了
    // data.length是序列化之后字符串长度，后台根据这个长度截取的不完整，那么这里长度应该是什么
    // 'Content-Length': data.length * 2
  }
}

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
