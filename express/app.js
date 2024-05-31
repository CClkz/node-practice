// app.js
const express = require('express')
const app = express()
const port = 3000

// 引入静态文件中间件配置
const configureStaticFiles = require('./config/static')
configureStaticFiles(app)

// 引入路由模块
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// 拦截器和路由按照顺序，依次匹配，或者说路由何尝不是拦截器呢

// // 中间件
app.use(function (req, res, next) {
  console.log('中间件1')
  next()
  console.log('中间件1end')
})
app.use(function (req, res, next) {
  console.log('中间件2')
  next()
})

// 使用中间件将路由模块挂载到应用
/**
 * app.vue可用户中间件和路由函数的注册
 * 中间件，一个函数(req,res,next),一定要引用next才能执行后续代码
 * 路由函数，路径 + 路由实例，需要res返回数据
 */
app.use('/', indexRouter)
app.use('/users', usersRouter)

// 匹配到路由是不会进入这个中间件的
app.use(function (req, res, next) {
  console.log('after 路由')
  // status指定状态，但还没结束，不加send接口会一直pending
  res.status(404)
  res.send('404 not found')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
