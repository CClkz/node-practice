const Koa = require('koa')
const app = new Koa()

// 设置秘钥,数组
app.keys = ['secret']

// 给ctx添加属性
app.context.testadd = 'test'

// logger

app.use(async (ctx, next) => {
  console.log('ctx testadd', ctx.testadd)
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// cookie
app.use(async (ctx, next) => {
  ctx.cookies.set('auth', 'admin')
  // 设置秘钥产生了name和name.sig两个cookie
  // 要只set加密后的，得自己处理加密信息再set
  ctx.cookies.set('name', 'tobi', { signed: true })
  // 读取有签名的cookie
  // const name = ctx.cookies.get('name', { signed: true })
  await next()
})

// response

app.use(async ctx => {
  // 先设置body，再setHeader X-Response-Time,Header生效了，为什么？
  // 因为响应头的发送在全部中间件执行完成后，那响应头和响应体的发送顺序呢，体一定在头之后？
  // 是的，几乎同时，但一定是先头后体，就是网络请求它不是一发一收的过程，浏览器看到的网络记录是结合后的结果
  ctx.body = 'Hello World'
})

app.listen(3000)
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
