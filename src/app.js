const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { apiInstance } = require('./router/api')
const { connect, dbHelper } = require('./db')
const static = require('koa-static')
const session = require('koa-session')
const { staticPath } = require('../config')
const fs = require('fs')
const path = require('path')

const readFile = async path => {
  return new Promise((r, j) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) j(err)
      r(data)
    })
  })
}

const checkIfIgnore = url => {
  const urls = ['/favicon.ico']

  return urls.some(val => url.includes(val))
}

app.keys = [process.env.SESSION_KEY]

app
.use(session({
  key: 'koa:Yan',
  maxAge: 1000 * 60 * 60 * 24 // 1day
}, app))
.use(async (ctx, next) => {
  console.log(ctx.status, ctx.req.method, ctx.req.url)
  if (checkIfIgnore(ctx.req.url)) {
    ctx.status = 418
    return
  }
  if (dbHelper.needConnectDB(ctx)) {
    await connect()
  }
  await next()

  if (!ctx.body) {
    const statusMap2Msg = {
      404: 'not found.', 
      503: 'server error.'
    }
    ctx.status = ctx.status
    console.log(ctx.body)
    if (ctx.status === 404 && !ctx.req.url.includes('/api')) {
      const html = await readFile(path.join(staticPath, '/index.html'))
      ctx.body = html
      ctx.status = 200
    } else if (ctx.status && statusMap2Msg[ctx.status]) {
      ctx.body = statusMap2Msg[ctx.status]
    } else {
      ctx.body = { status: false, message: 'unknown error.' }
    }
  }
})
.use(static(staticPath))
.use(bodyParser())
.use(apiInstance.middleware())

app.listen(3000)

module.exports = app.callback()
