const fs = require('fs')
const path = require('path')

// 这里的路径，是执行node命令时的目录，不是fs.js文件所在的目录
// path.join(__dirname, 'test.txt'),始终打开server目录下的test.txt文件，和执行node时目录无关
fs.open('./test.txt', 'r', (err, fd) => {
  //fd 是文件描述符。
  // 文件描述符：操作系统为了管理文件而分配给文件的一个非负整数标识符
  console.log('fd', fd)
  fs.readFile(fd, (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    // 打印文件内容
    console.log('File content:', data.toString())

    // 关闭文件
    fs.close(fd, err => {
      if (err) {
        console.error('Error closing file:', err)
      }
    })
  })
})
