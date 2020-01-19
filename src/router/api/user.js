const aesjs = require('aes-js')
const Router = require('@koa/router')
const { User } = require('../../models/user')
const userInstance = new Router()

userInstance.prefix('/user')
.post('/login', async ctx => {
  const {
    name,
    password
  } = ctx.request.body

  const user = await User.find({name})
  console.log(user)

  if (user) {
    if (user[0].password === password) {
      // ctx.body = Object.keys(user[0])
      // .filter(k => !['password'].includes(k))
      // .reduce((acc, k) => {
      //   acc[k] = user[k]
      //   return acc
      // }, {})
      ctx.body = user
    } else {
      ctx.status = 403
      ctx.body = { status: false, message: 'password not valided.'}
    }
  } else {
    ctx.status = 403
  }
})
.post('/register', async ctx => {
  const {
    name,
    password,
    id
  } = ctx.request.body

  try {
    const user = await User.findOne({id})
    if (user) {
      console.log(user)
      ctx.status = 403
      ctx.body = { status: false, message: 'user id already exist.'}
    } else {
      await new User({
        name, password, id
      }).save()
  
      ctx.status = 200
      ctx.body = { status: true, message: 'register success.'}
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = { status: false, message: e.message}
  }

})

module.exports = { userInstance }