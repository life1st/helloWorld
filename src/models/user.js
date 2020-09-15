const mongoose = require('mongoose')
const uuidV1 = require('uuid/v1')
const bcrypt = require('bcrypt')
const saltRount = 10

const userSchema = new mongoose.Schema({
  uid: { type: String, default: uuidV1 },
  name: { type: String, default: `用户${Math.random()}` },
  id: { type: String, required: true },
  password: { type: String, required: true},
  group: { type: Number, enum: [0, 1] },
  sessionKey: { type: String }
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v
    delete ret._id
    delete ret.password
    delete ret.sessionKey
  }
})

const User = mongoose.model('User', userSchema)

User.prototype.login = async function(sessionKey, password) {
  const { password: hashedPwd } = this
  const isPwdCorrect = await bcrypt.compare(password, hashedPwd)
  if (isPwdCorrect) {
    this.sessionKey = sessionKey
    return await this.save()
  } else {
    return false
  }
}

User.prototype.logout = async function() {
  this.sessionKey = null
  return await this.save()
}

User.prototype.register = async function() {
  const { password } = this
  const hashedPwd = await bcrypt.hash(password, saltRount)
  this.password = hashedPwd

  return await this.save()
}

module.exports = { User }
