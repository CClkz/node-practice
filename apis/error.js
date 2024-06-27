const fs = require('fs/promises')

try {
  const a = 1
  const b = a + a1
} catch (error) {
  // console.log('error', Object.keys(error)) // Object.keys只会访问到可枚举属性
  console.log('error', Object.getOwnPropertyNames(error)) // [ 'stack', 'message' ]
}

// 不可捕获异步方法里错误，可以await来捕获promise里的错误
;(async () => {
  let data
  try {
    data = await fs.readFile('a file that does not exist')
  } catch (err) {
    console.error('There was an error reading the file!', err)
    return
  }
  // Otherwise handle the data
})()

// 大部分接受callback的异步方法，第一个参数传err，err不为空就代表执行出错
fs.readFile('a file that does not exist', (err, data) => {
  if (err) {
    console.error('There was an error reading the file!', err)
    return
  }
  // Otherwise handle the data
})

const EventEmitter = require('node:events')
const ee = new EventEmitter()

setImmediate(() => {
  // This will crash the process because no 'error' event
  // handler has been added.
  ee.emit('error', new Error('This will crash'))
})
// event error，不用onerror捕获会导致程序崩溃
ee.on('error', err => {
  console.log('emit error', err)
})
