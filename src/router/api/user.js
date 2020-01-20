const aesjs = require('aes-js')
const Router = require('@koa/router')
const { User } = require('../../models/user')
const userInstance = new Router()

userInstance.prefix('/user')
.get('/', async ctx => {
  const { key } = ctx.session
  console.log(ctx.session, ctx.cookies)
  if (!key) {
    ctx.session.key = null
    ctx.status = 403
    ctx.body = { status: false, message: 'not login yet.'}
  } else {
    const user = await User.findOne({sessionKey: key}, {_id: 0, __v: 0, sessionKey: 0})

    if (user) {
      ctx.body = user
    } else {
      ctx.status = 404
      ctx.body = { status: false, message: 'invalid login status, please refresh' }
    }
  }
})
.post('/login', async ctx => {
  const {
    name,
    password
  } = ctx.request.body

  const user = await User.findOne({name}, {__v: 0, sessionKey: 0})

  if (user) {
    if (user.password === password) {
      ctx.session.key = String(Math.random()).split('.').pop() + Date.now()
      await user.login(ctx.session.key)
      ctx.body = user
    } else {
      ctx.status = 403
      ctx.body = { status: false, message: 'password not valided.'}
    }
  } else {
    ctx.status = 403
  }
})
.post('/logout', async ctx => {
  const { key } = ctx.session
  
  const user = await User.findOne({sessionKey: key})

  if (user) {
    await user.logout()
    ctx.body = { status: true, message: 'logout success.' }
  } else {
    ctx.status = 404
    ctx.body = { status: true, message: 'invalid login status, please refresh'}
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