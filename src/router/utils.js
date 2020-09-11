import { User } from '../models/user'
const requiredLogin = async (ctx, next) => {
  const excludePath = [
    '/login', '/register'
  ]

  if (ctx.req.method.toLowerCase() === 'get') {
    next()
  }

  if (excludePath.some(path => ctx.req.url.includes(path))) {
    next()
  }

  if (!ctx.session.key) {
    ctx.status = 403
    ctx.body = { status: false, message: 'login required.' }
    return
  } else {
    const user = await getUser(ctx)
    ctx.user = user
    return next()
  }
}

const getUser = async (ctx) => {
  const { key } = ctx.session

  try {
    return await User.findOne({sessionKey: key})
  } catch {
    return null
  }
}

module.exports = {
  requiredLogin, getUser
}