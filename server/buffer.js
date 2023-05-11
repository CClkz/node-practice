/**
 * buffer:缓冲,内存区域
 */

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

const buf1 = Buffer.alloc(4)
console.log('buf1', buf1, buf1.length, buf1[0], buf1[1], buf1[2], buf1[3])
