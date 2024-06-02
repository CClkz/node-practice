const Router = require('koa-router')
const router = new Router()

const users = []

// GET /user 接口，返回所有用户
router.get('/user', ctx => {
  ctx.body = {
    message: 'User list',
    data: users
  }
})

// POST /user 接口，添加一个新用户
router.post('/user', ctx => {
  const newUser = ctx.request.body
  if (newUser && newUser.name && newUser.age) {
    users.push(newUser)
    ctx.body = {
      message: 'User added',
      data: newUser
    }
    ctx.status = 201 // Created
  } else {
    ctx.status = 400 // Bad Request
    ctx.body = {
      message: 'Invalid user data'
    }
  }
})

module.exports = router
