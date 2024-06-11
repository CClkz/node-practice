const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('First middleware before next()')
  await next() // 调用下一个中间件
  console.log('First middleware after next()')
})

app.use(async (ctx, next) => {
  console.log('Second middleware before next()')
  await next() // 调用下一个中间件
  console.log('Second middleware after next()')
  //   ctx.body = 'Hello, Koa!';
})

// 处理异步
app.use(async (ctx, next) => {
  try {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello, 2s!')
      }, 2000)
    })
    console.log('set body');
    ctx.body = result
  } catch (err) {}
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
