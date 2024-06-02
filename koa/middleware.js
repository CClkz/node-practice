// 中间件

/**
 * 中间件签名，也就是中间件的代码结构
 * @param {*} ctx （Context）: Koa 的上下文对象，封装了 HTTP 请求和响应相关的各种信息和方法
 * @param {*} next 一个函数，调用它会将执行控制传递给下一个中间件
 */
async function middleware(ctx, next) {
  // 在这里可以处理请求前的逻辑

  await next() // 调用 next() 将执行控制传递给下一个中间件

  // 在这里可以处理请求后的逻辑
}

/**
 * 设置body内容
 * @param {*} ctx
 */
async function setBodyMw(ctx) {
  console.log('set body')
  ctx.body = 'Hello Koa1'
}

/**
 * 打印用时
 * @param {*} ctx
 * @param {*} next
 */
async function logTime(ctx, next) {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

/**
 * 设置用时
 * @param {*} ctx
 * @param {*} next
 */
async function setTime(ctx, next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

/**
 * 设置cookie
 * @param {*} ctx
 * @param {*} next
 */
async function setCookies(ctx, next) {
  const option = {} // 很丰富的cookie配置
  ctx.cookies.set('auth', 'admin', option)
  // 设置秘钥产生了name和name.sig两个cookie
  // 要只set加密后的，得自己处理加密信息再set
  ctx.cookies.set('name', 'tobi', { signed: true })
  // 读取有签名的cookie
  // const name = ctx.cookies.get('name', { signed: true })
  await next()
}

module.exports = { setBodyMw, logTime, setTime, setCookies }

// ctx.req  node http模块request对象
// ctx.res  node http模块response对象
// ctx.request koa的request对象
  // 封装了一层，提供一些更方便的api,例如获取参数
  // req需要自己解析url，request处理好了，ctx.request.query获取就好
// ctx.response koa的response对象
// ctx.request和ctx.response还提供了一些别名,结构更简洁
  // 例如ctx.body就等效于ctx.response.body
// ctx.respond ctx.respond=false绕过 ctx.response处理，使用ctx.res，koa不支持这个功能，什么意思呢？
// ctx.throw([status], [msg], [properties]) 抛出错误，默认status 500
  // ctx.throw(400, 'name required') 等效
  // const err = new Error('name required');
  // err.status = 400;
  // err.expose = true;
  // throw err;


