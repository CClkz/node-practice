const http = require('http')
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/todos?page=12',
  method: 'GET'
}

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    console.log('我是log', d)
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
