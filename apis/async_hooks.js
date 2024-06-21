// 异步上下文
const http = require('node:http')
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks')

// todo: AsyncResource

const asyncLocalStorage = new AsyncLocalStorage()

function logWithId(msg) {
  // asyncLocalStorage.getStore()需在run(store,callback) callback里调用，获取当前store，其他地方调用返回undefined
  const id = asyncLocalStorage.getStore()
  console.log(`${id !== undefined ? id : '-'}:`, msg)
}

let idSeq = 0
http
  .createServer((req, res) => {
    asyncLocalStorage.run(idSeq++, () => {
      logWithId('start')
      // Imagine any chain of async operations here
      setTimeout(() => {
        logWithId('finish')
        res.end()
      }, 50)
    })
  })
  .listen(8080)

http.get('http://localhost:8080')
http.get('http://localhost:8080')
// Prints:
// 0: start
// 1: start
// 0: finish
// 1: finish
