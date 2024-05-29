const Koa = require('koa')
const { setBodyMw } = require('./middleware')

const app = new Koa()

// 启动函数
function startApp(port) {
  // 尝试启动应用
  app
    .listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
    .on('error', err => {
      // 如果端口被占用
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use`)
        // 尝试增加端口号并重新启动应用
        startApp(port + 1)
      } else {
        // 其他错误，直接退出程序
        console.error('Server error:', err)
        process.exit(1)
      }
    })
}

/**
 * next 调用下一个中间件，next()返回promise，
 * 区别：express next()是普通函数，也不可用next().then()
 */
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(setBodyMw)


// 启动应用
startApp(3000)
