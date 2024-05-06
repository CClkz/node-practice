// ctrl + c 触发
let count = 0
process.on('SIGINT', () => {
  console.log('Received SIGINT.')
  count++
  if (count === 3) {
    process.exit()
  }
})

// 理论上process.kill触发，这里监听再优雅关闭
// 但一直没监听到，怎么回事呢
process.on('SIGTERM', () => {
  console.log('Received SIGTERM .')
})

process.on('beforeExit', code => {
  console.log('Process beforeExit event with code: ', code)
})

process.on('exit', code => {
  console.log('Process exit event with code: ', code)
})

console.log('process pid', process.pid)

setTimeout(() => {
  process.kill(process.pid, 'SIGTERM')
  // process.exit(1)
}, 2000)

setTimeout(()=>{
  console.log(10)
},10000)
