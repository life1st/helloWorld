const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  id: {type: String, required: true},
  title: {type: String, required: true},
  create_at: {type: Date, default: Date.now},
  author_uid: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content: {type: String, default: ''}
})
noteSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = { Note }
