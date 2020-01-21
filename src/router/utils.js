import { User } from '../models/user'
const requiredLogin = (ctx) => {
  const excludePath = [
    '/login', '/register'
  ]

  if (ctx.req.method.toLowerCase() === 'get') {
    return false
  }

  if (excludePath.some(path => ctx.req.url.includes(path))) {
    return false
  }

  if (!ctx.session.key) {
    ctx.status = 403
    ctx.body = { status: false, message: 'login required.' }
    return true
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