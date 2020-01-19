const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { apiInstance } = require('./router/api')
const { connect } = require('./db')

app
.use(async (ctx, next) => {
  console.log(ctx.req.url)

  await connect()
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
  } else if (ctx.body && !ctx.status) {
    ctx.status = 200
  }
  
})
.use(bodyParser())
.use(apiInstance.middleware())

app.listen(3000)

module.exports = app.callback()