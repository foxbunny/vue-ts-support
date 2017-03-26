'use strict'

const compilerFactory = require('./compiler')

compilerFactory('production').run((err, stats) => {
  if (err) {
    console.log(error)
  }
  else {
    console.log('Build completed')
  }
})