const url = require('url')

const request = (req, res) => {
  console.log('+++++++++++++++++++++')
  console.log('req url', req.url)
  console.log('req method', req.method)
  // 获取get参数时，调用url.parse
  // console.log('url parse', url.parse(req.url))
  let parsedUrl = url.parse(req.url)
  console.log('req pathname', parsedUrl.pathname)
  // 这里是拿不到body的，request函数调用在请求头之后、请求正文之前，需在on data里获取
  console.log('req body', req.body)

  let data = ''
  // 处理body信息，post请求才会触发
  req.on('data', chunk => {
    console.log('data', chunk)
    // chunk是buffer类型，字符串与buffer相加
    data += chunk
  })
  req.on('end', () => {
    console.log('end', data)
    console.log('---------------------')
  })
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')

  // 要处理完数据再返回，需将res.end()加在on end事件里
  res.end('Hello World\n')
  console.log('after res end')
}

// 判断req的method和pathname，来写很多条件语句
// 这种模式写接口太麻烦了

module.exports = request
