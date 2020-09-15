const mongoose = require('mongoose')
const uuidV1 = require('uuid/v1')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: uuidV1
  },
  url: {
    type: String,
  },
  recentUsedTimes: {
    type: Array
  }
})

fileSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
  }
})

const File = mongoose.model('File', fileSchema)

module.exports = { File }
