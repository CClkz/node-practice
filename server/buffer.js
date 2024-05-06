/**
 * buffer:字节数组|缓冲|内存区域
 */

const { buffer } = require('stream/consumers')

// console.log(Object.keys(Buffer));
// [
//   'poolSize',
//   'from',
//   'of',
//   'alloc',
//   'allocUnsafe',
//   'allocUnsafeSlow',
//   'isBuffer',
//   'compare',
//   'isEncoding',
//   'concat',
//   'byteLength'
// ]

const buf = Buffer.from('Hey!')
console.log('buf', buf, buf.length, buf[0], buf[1], buf[2], buf[3])
console.log('buf string', buf.toString())

const buf1 = Buffer.alloc(4)
console.log('buf1', buf1, buf1.length, buf1[0], buf1[1], buf1[2], buf1[3])
console.log('buf1 string', buf1.toString())
buf1.write('a')
console.log('buf1 string', buf1.toString()) // a
buf1.write('b')
console.log('buf1 string', buf1.toString()) // b
buf1.write('bcdef')
console.log('buf1 string', buf1.toString()) // bcde
let bufCopy = Buffer.alloc(4)
buf1.copy(bufCopy)
console.log('bufCopy', bufCopy.toString())

// buffer.slice 不是副本，跟随原始buffer变化，这点与Array.slice不同
