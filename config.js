const path = require('path')

const root = __dirname
const staticPath = path.join(root, '/_dist')

module.exports = {
  root,
  staticPath
}
