const axios = require('axios')

axios
  .post('http://localhost:3000/todos', {
    todo: '做点事情'
  })
  .then(res => {
    console.log(`状态码: ${res.status}`)
    console.log(res.data)
  })
  .catch(error => {
    console.error(error)
  })
