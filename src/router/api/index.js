const Router = require('@koa/router')
const { noteInstance } = require('./note')

const apiInstance = new Router()

apiInstance.prefix('/api')
.use(noteInstance.middleware())

module.exports = { apiInstance }