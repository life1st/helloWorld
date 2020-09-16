const Router = require('@koa/router')
const { noteInstance } = require('./note')
const { userInstance } = require('./user')
const { fileInstance } = require('./file')

const apiInstance = new Router()

apiInstance.prefix('/api')
.use(noteInstance.middleware())
.use(userInstance.middleware())
.use(fileInstance.middleware())

module.exports = { apiInstance }
