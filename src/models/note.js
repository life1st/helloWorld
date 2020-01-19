const { db } = require('../db')
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  title: {type: String, required: true},
  create_at: {type: Date, default: Date.now},
  author: {type: String},
  content: {type: String, default: ''}
})

const Note = db.model('note', noteSchema)

module.exports = { Note }