const axios = require('axios')

// 请求参数：a todo都会带上
axios
  .get('http://localhost:3000/todos?a=1', {
    // 注意，这里参数要放在params下
    params: {
      todo: '做点事情'
    }
  })
  .then(res => {
    console.log(`状态码: ${res.status}`)
    console.log(res.data)
  })
  .catch(error => {
    console.error(error)
  })

// 执行改文件报错
// E:\codes\world\node-practice\node_modules\axios\index.js:1
// import axios from './lib/axios.js';
// ^^^^^^

// SyntaxError: Cannot use import statement outside a module

// 最后将node12.13.1升级到16.14.1，报错消失
