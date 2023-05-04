// 命令行接收输入
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

let user = {
  name: '',
  pass: ''
}

const closeTime = 2000

readline.question(`请输入用户名：`, name => {
  user.name = name
  readline.question(`请输入密码：`, pass => {
    user.pass = pass
    console.log(`您好！${user.name}`)
    setTimeout(() => {
      readline.close()
    }, closeTime)
  })
})
