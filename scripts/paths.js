const fs = require('fs')
const path = require('path')

const CWD = fs.realpathSync(process.cwd())
const inAppDir = (relPath) => 
  relPath ?
  path.resolve(CWD, relPath)
  : null

module.exports = {
  inAppDir,
  PACKAGE_JSON: inAppDir('package.json'),
  PUBLIC_DIR: inAppDir('public'),
  SOURCE_DIR: inAppDir('src'),
  NODE_MODULES: inAppDir('node_modules')
}
