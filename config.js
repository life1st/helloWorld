const path = require('path')

const root = __dirname
const staticPath = path.join(root, '/src/_dist')

module.exports = {
  root,
  staticPath
}
