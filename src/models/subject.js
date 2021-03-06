const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  id_douban: { type: Number, default: null },
  id_imdb: { type: Number, default: null },
  name: { type: String, required: true },
  type: { 
    type: String,
    enum: ['movie', 'book', 'music'],
  },
  subtype: {
    type: String,
    enum: ['movie', 'tv', 'book', 'music']
  },
  pic: {
    type: Object,
  },
})

const Subject = mongoose.model('subject', subjectSchema)

module.exports = { Subject }
