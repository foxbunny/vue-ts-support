'use strict'

const WebpackDevServer = require('webpack-dev-server')

const compilerFactory = require('./compiler')
const paths = require('./paths')

const port = compilerFactory.packageConfig.port || 8080

const compiler = compilerFactory('development')
compiler.plugin('done', () => {
  console.log(`Dev server is at http://localhost:${port}/`)
})

const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: paths.PUBLIC_DIR,
  stats: 'errors-only'
})
server.listen(port)