// 集群
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  console.log('cluster.workers', Object.keys(cluster.workers))

  // 监听工作进程的退出事件
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    // 重新启动工作进程
    cluster.fork()
  })
} else {
  // 工作进程共享任何 TCP 连接
  // 在这种情况下，它是一个 HTTP 服务器
  http
    .createServer((req, res) => {
      console.log(`Worker ${process.pid} handling request`)
      res.writeHead(200)
      res.end('hello world\n')
    })
    .listen(8000, () => {
      console.log(`Worker ${process.pid} started and listening on port 8000`)
    })
}

// netstat -ano | grep :8000
// ps -p <pid> 没搜到这个主进程或子进程
// tasklist /FI "PID eq <pid>"
