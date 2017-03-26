'use strict'

const Webpack = require('webpack')

const createConfig = require('./webpack.config')
const paths = require('./paths')
const packageConfig = require(paths.PACKAGE_JSON)

const options = packageConfig.vueTS || {}

const compilerFactory = (env) => {
  process.env.NODE_ENV = env
  const configOptions = {
    extra: options.webpackExtra ?
      require(paths.inAppDir(packageConfig.webpackExtra))
      : []
    proxy: options.proxy
  }
  const config = createConfig(configOptions)
  return Webpack(config)
}

compilerFactory.packageConfig = packageConfig
compilerFactory.options = options

module.exports = compilerFactory