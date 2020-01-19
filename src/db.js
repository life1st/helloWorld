const mongoose = require('mongoose')
const host = (password) => (`mongodb+srv://jiaoyang:${password}@cluster0-kyrqp.mongodb.net/blog?retryWrites=true`)

const connect = async () => {
  await mongoose.connect(host(process.env.MONGO_PWD))
}
const db = mongoose.connection

db.on('error', err => {
  console.log(err, 'mongo erred.')
}).once('open', callback => {
  console.log('mongo connected.')
})

module.exports = { connect, db }