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
  ctx.body = 'Hello Koa1'
}

module.exports = { setBodyMw }
