const Koa = require('koa')
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

// 响应
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

// 启动应用
startApp(3000)
