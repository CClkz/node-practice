const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('First middleware before next()')
  next() // 调用下一个中间件
  console.log('First middleware after next()')
})

app.use((req, res, next) => {
  console.log('Second middleware before next()')
  next() // 调用下一个中间件
  console.log('Second middleware after next()')
})

app.use((req, res) => {
  console.log('Third middleware')
  //   res.send('Hello, Express!')
})

app.use('/hello', (req, res) => {
  res.send('Hello, hello!')
})

// 处理异步
// 回调
app.get('/callback', (req, res) => {
  setTimeout(() => {
    res.send('Hello, callback!')
  }, 2000)
})

// promise
app.get('/promise', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello, promise!')
    }, 2000)
  })
    .then(res1 => {
      res.send(res1)
    })
    .catch()
})

// async await
app.get('/async', async (req, res) => {
  try {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello, async !')
      }, 2000)
    })
    res.send(result)
  } catch (err) {}
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})

// express koa 区别
// 1. koa async await处理异步更简洁
// 2. 中间件调用，await next() 和next(),koa等待下个中间件执行完成，（下个中间件存在异步，await就有作用了）
// 3. 错误处理，koa try(await next())catch(){}捕获，express next(err)在后续错误中间件捕获
// 4. express内置了一些功能，koa更简洁

// express处理一步的几种方式
// 1. 回调，君记得回调地狱否
// 2. promise
// 3. async await


// express内置的功能
// 1. 路由，koa app.use('/user',) app.get('/user',)就会报错
// 2. 中间件，express.json()、express.urlencoded()、express.static(),express上存在很多方法，koa就没有了
