const Router = require('@koa/router')
const { Note } = require('../../models/note')
const noteInstance = new Router()

noteInstance.prefix('/note')
.get('s', async ctx => {
  let { start, page_count } = ctx.query
  start = Number(start)
  page_count = Number(page_count)
  if (
    (start && Number.isNaN(start)) 
    || (page_count && Number.isNaN(page_count))
  ) {
    ctx.status = 403
    ctx.body = { status: false, message: 'unsupport query.' }
    return
  }

  if (!page_count) {
    page_count = 10
  }
  if (!start) {
    start = 0
  }
  
  ctx.body = await Note.find({}, {_id: 0, __v: 0}).skip(start).limit(page_count)
})
.post('/:id', async ctx => {
  const { id } = ctx.params
  if (!id || Number.isNaN(Number(id))) {
    ctx.status = 403
    ctx.body = { status: false, message: 'invalid note id.' }
    return 
  }

  const note = await Note.findOne({id})
  
  if (note) {
    ctx.status = 403
    ctx.body = { status: false, message: 'note id already exist.' }
  } else {
    const {
      title,
      content
    } = ctx.request.body
    const note = await new Note({id, title, content}).save()

    ctx.body = { status: true, message: 'saved.' }
  }
})
.put('/:id', async ctx => {
  const { id } = ctx.params
  if (!id || Number.isNaN(Number(id))) {
    ctx.status = 403
    ctx.body = { status: false, message: 'invalid note id.' }
    return
  }

  const note = await Note.findOne({id})
  if (note) {
    const {
      title,
      content
    } = ctx.request.body

    try {
      await note.update({title, content}, {id})
      ctx.status = 200
      ctx.body = { status: true, message: 'saved.' }
    } catch {
      ctx.status = 503
      ctx.body = { status: false, message: 'server error.' }
    }
  } else {
    ctx.status = 404
    ctx.body = { status: false, message: 'not found.' }
  }
})
.delete('/:id', async ctx => {
  const { id } = ctx.params
  if (!id || Number.isNaN(Number(id))) {
    ctx.status = 403
    ctx.body = { status: false, message: 'invalid note id.' }
    return
  }

  const note = await Note.deleteOne({id})

  if (note) {
    ctx.status = 200
    ctx.body = { status: true, message: 'deleted.' }
  } else {
    ctx.status = 404
    ctx.body = { status: false, message: 'not found.' }
  }
})

module.exports = { noteInstance }
