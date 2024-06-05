const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { setBodyMw, logTime, setTime, setCookies } = require('./middleware')

// 引入路由
const userRouter = require('./routers/user')

const app = new Koa()

// 设置秘钥,数组
app.keys = ['secret']

// 给ctx添加属性
app.context.testadd = 'test'

// 使用 koa-bodyparser 中间件来解析请求体
app.use(bodyParser())

// logger
app.use(logTime)

// x-response-time
app.use(setTime)

// cookie
app.use(setCookies)

// allowedMethods中间件，path对应但method不匹配的时候制动设置响应头'Allow: GET, POST'，并返回'405 Method Not Allowed'
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// response,抢先一步，让下面的响应体中间件无处可用
app.use(async (ctx, next) => {
  // 先设置body，再setHeader X-Response-Time,Header生效了，为什么？
  // 因为响应头的发送在全部中间件执行完成后，那响应头和响应体的发送顺序呢，体一定在头之后？
  // 是的，几乎同时，但一定是先头后体，就是网络请求它不是一发一收的过程，浏览器看到的网络记录是结合后的结果
  ctx.body = 'Hello World'
  await next() // next里也包含ctx.body，和下一行先后顺序影响结果
})

app.use(setBodyMw)

// 错误被捕获处理了，后续没throw，不会传递给错误侦听器
app.onerror(err => {
  console.error('onerror', err)
})

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

// 启动应用
startApp(3000)

// app.listen(3000)
// 等同于
// http.createServer(app.callback()).listen(3000);
// http.createServer(app.callback()).listen(3001); // 可将服务加到多个端口

// 请求到达时：第一个中间件（Logger）开始执行，并等待下一个中间件完成。
// 执行第二个中间件（X-Response-Time）：
// 记录当前时间 start。
// 等待下一个中间件完成。
// 执行第三个中间件（Response）：设置 ctx.body 为 'Hello World'，然后返回。
// 返回到第二个中间件：
// 计算处理时间 ms。
// 设置 X-Response-Time 响应头。
// 返回到第一个中间件：记录日志信息，包括 X-Response-Time 的值。
// 响应发送：在所有中间件完成后，Koa 会将响应头和主体一起发送到客户端。
