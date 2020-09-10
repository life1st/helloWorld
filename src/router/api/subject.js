const Router = require('@koa/router')
const { Subject } = require('../../models/subject')
const { Interest } = require('../../models/interests')
const { User } = require('../../models/user')
const SubjectInstrance = new Router()

SubjectInstrance.prefix('/subject')
.get('/:id', async ctx => {
  const { id } = ctx.params
  
  if (!id || Number.isNaN(Number(id))) {
    ctx.status = 403
    ctx.body = { status: false, message: 'invalid subject id'}
    return
  }

  try {
    const subject = await Subject.findOne({id_douban: id}) || await Subject.findOne({id_imdb: id})
    
    ctx.status = 200
    ctx.body = subject
  } catch {
    ctx.status = 404
    ctx.body = { status: false, message: 'subject not exist.' }
  }
})
.post('/:id', async ctx => {
  const {} = ctx.body

})
