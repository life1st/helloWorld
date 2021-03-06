const Router = require('@koa/router')
const { Note } = require('../../models/note')
const { User } = require('../../models/user')
const { requiredLogin, getUser } = require('../utils')
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
  
  ctx.body = await Note.find({}, {content: 0}).skip(start).limit(page_count).populate('author', '-group')
})
.get('/:id', async ctx => {
  const { id } = ctx.params
  const note = await Note.findOne({id}, {_id: 0, __v: 0}).populate('author')
  if (note) {
    const body = {
      ...note.toObject(),
    }
    if (!body.author) {
      body.user = await User.findOne({uid: note.author_uid}, {_id: 0, __v: 0, sessionKey: 0, password: 0})
      Note.update({author: body.user._id})
    } else {
      body.user = body.author
    }
    delete body.author_uid
    ctx.body = body
  }
})
.post('/:id', 
requiredLogin,
async ctx => {
  const { id } = ctx.params
  if (!id) {
    ctx.status = 403
    ctx.body = { status: false, message: 'invalid note id.' }
    return
  }

  const note = await Note.findOne({id})
  if (note) {
    ctx.status = 403
    ctx.body = { status: false, message: 'note id already exist.' }
  } else {
    const { title, content } = ctx.request.body
    await new Note({id, title, content, author_uid: ctx.user.uid, author: ctx.user._id}).save()
    ctx.body = { status: true, message: 'saved.' }
  }
})
.put('/:id',
requiredLogin,
async ctx => {
  const { id } = ctx.params
  if (!id) {
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
.delete('/:id',
requiredLogin,
async ctx => {
  const { id } = ctx.params
  if (!id) {
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
