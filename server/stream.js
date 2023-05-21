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
  read() {}
})

// 可写流
const writableStream = new Stream.Writable()
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}
readableStream.pipe(writableStream)

readableStream.push('hello')
readableStream.push('world')
writableStream.write('write')

setTimeout(() => {
  writableStream.end()
}, 500)
