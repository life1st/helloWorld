const mongoose = require('mongoose')
const { validate } = require('uuid')

const statusSchema =new  mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    maxLength: 300
  },
  create_time: {
    type: Date,
    default: Date.now()
  }
})
statusSchema.set('toJSON', ({
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
    ret.create_time = new Date(ret.create_time).toLocaleString()
  }
}))

const Status = mongoose.model('Status', statusSchema)

module.exports = { Status }
