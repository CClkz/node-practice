/**
 * 流
 *
 */

const Stream = require('stream')
// console.log('',Object.keys(Stream));
// [
//   'Readable',
//   'Writable',
//   'Duplex',
//   'Transform',
//   'PassThrough',
//   'pipeline',
//   'finished',
//   'Stream',
//   '_isUint8Array',
//   '_uint8ArrayToBuffer'
// ]

// 可读流
const readableStream = new Stream.Readable({
  read() {
    // read触发的三种情况
    // 1. 直接调用readableStream.read()
    // 2. 监听data
    // 3. 推数据入流，readableStream.push('')
    console.log('read')
  }
})

// 可写流
const writableStream = new Stream.Writable()
writableStream._write = (chunk, encoding, next) => {
  console.log('_write', chunk.toString())
  next()
}
readableStream.pipe(writableStream)

// 异步任务,被加到缓冲区，后面统一处理，只触发一次read

readableStream.push('hello')
readableStream.push('world')
console.log('before write')
// 同步任务
writableStream.write('write')

setTimeout(() => {
  writableStream.end()
}, 1500)
