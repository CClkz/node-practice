const request = (req, res) => {
  console.log('req url', req.url)
  // console.log('url parse', url.parse(req.url))
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
}

module.exports = request
