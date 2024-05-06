const EventEmitter = require('events')
const Event = new EventEmitter()

const sleepHandler = () => {
  console.log('enter sleep')
}

const sleepHandlerPre = () => {
  console.log('enter sleep pre')
}

Event.on('sleep', sleepHandler)
Event.once('sleep', sleepHandler)
// unshift，监听器列表头部加入
// sleep监听添加了两个回调函数，prependListener添加的先触发
Event.prependListener('sleep', sleepHandlerPre)
Event.prependOnceListener('sleep', sleepHandlerPre)

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
