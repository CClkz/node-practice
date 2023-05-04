const { preProcessFile } = require('typescript')

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.')
})

process.on('beforeExit', code => {
  console.log('Process beforeExit event with code: ', code)
})

process.on('exit', code => {
  console.log('Process exit event with code: ', code)
})

console.log('This message is displayed first.')

setTimeout(() => {
  // process.kill(process.pid, 'SIGINT')
  process.exit(1)
}, 2000)
