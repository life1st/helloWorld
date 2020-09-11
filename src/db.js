const mongoose = require('mongoose')
const { isLoacl } = require('./utils/env')
const host = (password) => (`mongodb+srv://jiaoyang:${password}@cluster0-kyrqp.mongodb.net/blog?retryWrites=true`)

const connect = async () => {
  if (!dbHelper.status.isConnected) {
    if (isLoacl) {
      await mongoose.connect('mongodb://localhost:27017/blog')
    } else {
      await mongoose.connect(host(process.env.MONGO_PWD))
    }
  }
}
const db = mongoose.connection

const dbHelper = {
  needConnectDB: ctx => {
    const paths = ['/api']
    
    return paths.some(path => ctx.req.url.includes(path)) 
  },
  status: {
    isConnected: false
  }
}

db.on('error', err => {
  console.log(err, 'mongo erred.')
}).once('open', callback => {
  dbHelper.status.isConnected = true
  console.log('mongo connected.')
})

module.exports = { connect, db, dbHelper }
