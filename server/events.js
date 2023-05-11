const EventEmitter = require('events')
const Event = new EventEmitter()

const sleepHandler = () => {
  console.log('enter sleep')
}
Event.on('sleep', sleepHandler)
Event.once('sleep', sleepHandler)
// unshift，监听器列表头部加入
Event.prependListener('sleep', sleepHandler)
Event.prependOnceListener('sleep', sleepHandler)

Event.emit('sleep')

console.log('setMaxListeners', Event.setMaxListeners(15))
console.log('getMaxListeners', Event.getMaxListeners()) // 默认10

console.log('eventNames', Event.eventNames())

console.log('listenerCount', Event.listenerCount('sleep'))
console.log('listeners', Event.listeners('sleep'))

setTimeout(() => {
  Event.off('sleep', sleepHandler)
  Event.emit('sleep')
}, 2000)

// export default Event
module.exports = Event
