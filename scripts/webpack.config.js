'use strict'

const {
  createConfig,
  defineConstants,
  env,
  entryPoint,
  setOutput,
  sourceMaps,
  addPlugins
} = require('@webpack-blocks/webpack2')
const webpack = require('webpack')
const devServer = require('@webpack-blocks/dev-server2')
const postcss = require('@webpack-blocks/postcss')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const autoprefixer = require('autoprefixer')

const paths = require('./paths')
const ts = require('./ts-block')
const vue = require('./vue-block')
const resolve = require('./resolve-block')

const basePlugins = [
  // Generate skeleton HTML file
  new HtmlWebpackPlugin({
    inject: true,
    template: 'public/index.html'
  }),
  // Show nice progress bar
  new ProgressBarPlugin()
]

const productionPlugins = [
  // Support older plugins/loaders that still use global options
  // see https://webpack.js.org/plugins/loader-options-plugin/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  // Minify JavaScript
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    screwIe8: true,
    sourceMap: false
  })
]

module.exports = ({ extra = [], proxy = null }) =>
  createConfig([
    // This will use ./src/index.* based on extension resolution order
    entryPoint(paths.SOURCE_DIR),

    // Always incude the [hash] because the URL is injected into the skeleton
    // generated by the HtmlWebpackPlugin
    setOutput('./build/bundle-[hash].js'),

    // Resolve packages in both node_modules and in src dir
    resolve({
      modules: [
        paths.SOURCE_DIR,
        paths.NODE_MODULES
      ]
    }),

    // TypeScript loader options are specified in tsconfig.json
    ts({ appendTsSuffixTo: [/\.vue$/] }),

    // Independent CSS loading
    postcss(),

    // Vue loader must play nice with TypeScript so we use esModule option
    vue({
      // Make compatible with TS loader
      esModule: true,
      // Use autoprefixer
      postcss: [autoprefixer()]
    }),

    // Make process.env.NODE_ENV available in the client code
    defineConstants({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),

    // Add all the base plugins
    addPlugins(basePlugins),

    env('development', [
      // In development mode, activate dev server and source maps
      devServer(),
      proxy ? devServer.proxy({ '/api': proxy }) : () => {},
      sourceMaps(),
    ]),

    env('production', [
      // Add all the production plugins
      addPlugins(productionPlugins)
    ])
  ].concat(extra))