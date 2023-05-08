const request = (req, res) => {
  console.log('req url', req.url)
  // console.log('url parse', url.parse(req.url))
  console.log('req body', req.body)

  let data = ''
  req.on('data', chunk => {
    console.log('data', chunk)
    // chunk是buffer类型，字符串与buffer相加
    data += chunk
  })
  req.on('end', () => {
    console.log('end', data)
  })
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
}

module.exports = request
