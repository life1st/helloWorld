const aesjs = require('aes-js')
const Router = require('@koa/router')
const { User } = require('../../models/user')
const userInstance = new Router()

userInstance.prefix('/user')
.get('/', async ctx => {
  const { key } = ctx.session
  if (!key) {
    ctx.session.key = null
    ctx.status = 403
    ctx.body = { status: false, message: 'not login yet.'}
  } else {
    const user = await User.findOne({sessionKey: key}, {_id: 0, __v: 0, sessionKey: 0, password: 0})

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
    id,
    password
  } = ctx.request.body

  const user = await User.findOne({id}, {__v: 0})

  if (user) {
    ctx.session.key = String(Math.random()).split('.').pop() + Date.now()
    const isPwdCorrect = await user.login(ctx.session.key, password)

    if (isPwdCorrect) {
      ctx.body = Object.keys(user._doc)
        .filter(k => !['password', 'sessionKey', '_id'].includes(k))
        .reduce((acc, k) => {
          acc[k] = user[k]
          return acc
        }, {})
    } else {
      ctx.status = 403
      ctx.body = { status: false, message: 'password invalid.'}
    }
  } else {
    ctx.status = 401
    ctx.body = { status: false, message: 'invalid user.'}
  }
})
.post('/logout', async ctx => {
  const { key } = ctx.session
  
  const user = await User.findOne({sessionKey: key})

  if (user) {
    ctx.session.key = null
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
      ctx.status = 403
      ctx.body = { status: false, message: 'user id already exist.'}
    } else {
      await new User({
        name, password, id, group: 1
      }).register()
  
      ctx.status = 200
      ctx.body = { status: true, message: 'register success.'}
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = { status: false, message: e.message}
  }
})

module.exports = { userInstance }