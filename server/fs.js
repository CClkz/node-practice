const fs = require('fs')

fs.open('./test.txt', 'r', (err, fd) => {
  //fd 是文件描述符。
  console.log('fd', fd)
})
