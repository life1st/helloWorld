const { db } = require('../db')
const mongoose = require('mongoose')
const uuidV1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
  uid: { type: String, default: uuidV1 },
  name: { type: String, default: `用户${Math.random()}` },
  id: { type: String, required: true },
  password: { type: String, required: true},
  group: { type: Number, enum: [0, 1] },
  sessionKey: { type: String }
})

const User = db.model('user', userSchema)

User.prototype.login = async function(sessionKey) {
  this.sessionKey = sessionKey
  await this.save()
  return true
}

User.prototype.logout = async function() {
  this.sessionKey = null
  await this.save()
  return true
}

module.exports = { User }