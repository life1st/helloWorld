require('dotenv').config()
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-body')
const { apiInstance } = require('./router/api')
const { connect, dbHelper } = require('./utils/db')
const static = require('koa-static')
const session = require('koa-session')
const { staticPath } = require('../config')
const fs = require('fs')
const path = require('path')
const {
  SESSION_KEY, PORT
} = require('./consts')

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

app.keys = [SESSION_KEY]

app
.use(session({
  key: 'koa:Yan',
  maxAge: 1000 * 60 * 60 * 24 // 1day
}, app))
.use(async (ctx, next) => {
  if (checkIfIgnore(ctx.req.url)) {
    ctx.status = 418
    return
  }
  if (dbHelper.needConnectDB(ctx)) {
    await connect()
  }
  await next()

  console.log(ctx.status, ctx.req.method, ctx.req.url)
  if (!ctx.body) {
    const statusMap2Msg = {
      404: 'not found.', 
      503: 'server error.'
    }
    ctx.status = ctx.status
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
.use(bodyParser({
  multipart: true
}))
.use(apiInstance.middleware())

app.listen(PORT, () => {
  console.log(`app listen@http://localhost:${PORT}`)
})

module.exports = app.callback()
