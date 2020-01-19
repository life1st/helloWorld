const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { apiInstance } = require('./router/api')
const { connect } = require('./db')

const needConnectDB = ctx => {
  const paths = ['/api']
  
  return paths.some(path => ctx.req.url.includes(path)) 
}

app
.use(async (ctx, next) => {
  console.log(ctx.req.url)
  if (needConnectDB(ctx)) {
    await connect()
  }
  await next()

  console.log(ctx.body, ctx.status)
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
.use(bodyParser())
.use(apiInstance.middleware())

app.listen(3000)

module.exports = app.callback()