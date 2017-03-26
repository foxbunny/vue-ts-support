'use strict'

const Webpack = require('webpack')

const createConfig = require('./webpack.config')
const paths = require('./paths')
const packageConfig = require(paths.PACKAGE_JSON)

const compilerFactory = (env) => {
  process.env.NODE_ENV = env
  const configOptions = {
    extra: packageConfig.webpackExtra ?
      require(paths.inAppDir(packageConfig.webpackExtra))
      : []
    proxy: packageConfig.webpackProxy
  }
  const config = createConfig(configOptions)
  return Webpack(config)
}

compilerFactory.packageConfig = packageConfig

module.exports = compilerFactory