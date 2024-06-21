// 子进程
const { spawn } = require('node:child_process')
// spawn,生成

// 创建一个子进程，执行 'node -i' 命令，进入 Node.js 的交互式 REPL
// 类ChildProcess的实例
const child = spawn('node', ['-i'])
// const child = spawn('ls', ['-ll', '/usr'])

// 监听子进程的标准输出
child.stdout.on('data', data => {
  console.log(`stdout: ${data}`)
})

// 监听子进程的标准错误
child.stderr.on('data', data => {
  console.error(`stderr: ${data}`)
})

// 监听子进程的关闭事件
child.on('close', code => {
  console.log(`child process exited with code ${code}`)
})

// 向子进程的标准输入写数据
child.stdin.write('console.log("Hello from parent process!");\n')
// child.stdin.write('process.exit();\n') // 结束子进程
