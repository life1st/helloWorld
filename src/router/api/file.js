const Router = require('@koa/router')
const { File } = require('../../models/file')
const { requiredLogin } = require('../utils')
const fileInstance = new Router()
const fs = require('fs')
const cloudinary = require('cloudinary').v2

fileInstance.prefix('/file')
.post('/', 
requiredLogin,
async ctx => {
  const { file } = ctx.request.files
  const reader = fs.createReadStream(file.path)
  const stream = cloudinary.uploader.upload_stream((e, res) => {
    console.log('uploading...')
  })
  reader.pipe(stream)
})