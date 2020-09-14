const mongoose = require('mongoose')

const interestsSchema = new mongoose.Schema({
  user_uid: { type: String },
  data: { type: Array }
})

const Interest = mongoose.model('interest', interestsSchema)

module.exports = { Interest }
