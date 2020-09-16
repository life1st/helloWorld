const mongoose = require('mongoose')
const uuidV1 = require('uuid/v1')
const cloudinary = require('cloudinary')

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
  },
  public_id: {
    type: String,
    required: true
  }
})

fileSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
  }
})

const File = mongoose.model('File', fileSchema)

File.prototype.getObj = async (name) => {
   const file = await cloudinary.api.resource(name)
   this.recentUsedTimes.push(Date.now())
   this.save()
   return file
}

File.prototype.upload = async (file) => {
  
}

module.exports = { File }
