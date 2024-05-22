// app.js
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// 引入路由模块
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// 拦截器和路由按照顺序，依次匹配，或者说路由何尝不是拦截器呢

// 拦截器
app.use(function (req, res, next) {
  console.log('before 路由')
  next()
})

// 静态文件
app.use('/static', express.static(path.join(__dirname, 'assets')))

// 使用中间件将路由模块挂载到应用
app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(function (req, res, next) {
  console.log('after 路由')
  // status指定状态，但还没结束，不加send接口会一直pending
  res.status(404)
  res.send('404 not found')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
