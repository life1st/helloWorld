const path = require('path')

const root = __dirname
const staticPath = path.join(root, '/src/static')

module.exports = {
  root,
  staticPath
}