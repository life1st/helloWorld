const Router = require('@koa/router')
const { noteInstance } = require('./note')
const { userInstance } = require('./user')

const apiInstance = new Router()

apiInstance.prefix('/api')
.use(noteInstance.middleware())
.use(userInstance.middleware())

module.exports = { apiInstance }