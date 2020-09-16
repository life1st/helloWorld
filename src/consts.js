const isLoacl = process.env.ENV_LOCAL
const SESSION_KEY = process.env.SESSION_KEY
const PORT = process.env.PORT
const MONGO_PWD = process.env.MONGO_PWD

module.exports = {
  isLoacl, SESSION_KEY, PORT, MONGO_PWD
}
