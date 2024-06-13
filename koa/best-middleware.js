const compose = require('koa-compose')

// 中间件参数
// 对中间件封装一层函数
// 即使中间件不传参，封装一层也是保持统一的好习惯
function logger(format) {
  format = format || ':method ":url"'

  // return async function logger (ctx, next) {
  return async function (ctx, next) {
    const str = format.replace(':method', ctx.method).replace(':url', ctx.url)

    console.log(str)

    await next()
  }
}

// 组合下列中间件
async function random(ctx, next) {
  if ('/random' == ctx.path) {
    ctx.body = Math.floor(Math.random() * 10)
  } else {
    await next()
  }
}

async function backwards(ctx, next) {
  if ('/backwards' == ctx.path) {
    ctx.body = 'sdrawkcab'
  } else {
    await next()
  }
}

async function pi(ctx, next) {
  if ('/pi' == ctx.path) {
    ctx.body = String(Math.PI)
  } else {
    await next()
  }
}

const allMiddlewares = compose([random, backwards, pi]) // 组合中间件,use(allMiddlewares)相当于 use(random) use(backwards) use(pi)

module.exports = { logger, allMiddlewares }
