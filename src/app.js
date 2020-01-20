const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { apiInstance } = require('./router/api')
const { connect, dbHelper } = require('./db')
const static = require('koa-static')
const session = require('koa-session')
const { staticPath } = require('../config')

const checkIfIgnore = (url) => {
  const urls = ['/favicon.ico']

  return urls.some(val => url.includes(val) || val.includes(url))
}

app.keys = ['sec']
// app.keys = [process.env.SESSION_KEY]

app
.use(session({
  key: 'koa:Yan',
  maxAge: 100000 //ms
  // maxAge: 1000 * 60 * 60 * 24 // 1day
}, app))
.use(async (ctx, next) => {
  console.log(ctx.req.url)
  if (checkIfIgnore(ctx.req.url)) {
    ctx.status = 418
    return
  }
  if (dbHelper.needConnectDB(ctx)) {
    await connect()
  }
  await next()

  let n = ctx.session.views || 0
  ctx.session.views = ++n
  
  console.log(ctx.status, ctx.session.views)
  if (!ctx.body) {
    const statusMap2Msg = {
      404: 'not found.', 
      503: 'server error.'
    }
    if (ctx.status && statusMap2Msg[ctx.status]) {
      ctx.body = statusMap2Msg[ctx.status]
    } else {
      ctx.body = { status: false, message: 'unknown error.' }
    }
    return
  }
  if (ctx.body && !ctx.status) {
    ctx.status = 200
  }
})
.use(static(staticPath))
.use(bodyParser())
.use(apiInstance.middleware())

app.listen(3000)

module.exports = app.callback()