const Router = require('@koa/router')
// const { File } = require('../../models/file')
const { requiredLogin } = require('../utils')
const fileInstance = new Router()
const fs = require('fs')
const cloudinary = require('cloudinary')
const axios = require('axios')

fileInstance.prefix('/file')
.post('/', 
requiredLogin,
async ctx => {
  const { file } = ctx.request.files
  const resp = await new Promise(r => {
    const reader = fs.createReadStream(file.path)
    const stream = cloudinary.v2.uploader.upload_stream((e, res) => {
      console.log('uploaded:', res)
      r(res)
    })
    reader.pipe(stream)
  })

  ctx.status = 200
  ctx.body = resp
})
.get('/:name', async ctx => {
  const { name } =ctx.params

  const image = await cloudinary.api.resource(name)
  ctx.type = image.format
  ctx.body = await axios({
      url: image.url,
      responseType: 'stream'
    }).then(res => res.data)
})

module.exports = {
  fileInstance
}
