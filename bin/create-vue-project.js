#!/usr/bin/env node

const fs = require('graceful-fs')
const path = require('path')
const cp = require('child_process')
const chalk = require('chalk')

const cpr = require('../util/cpr').cpr

const THIS_PATH = path.resolve(__dirname, '..')
const APP_PATH = process.cwd()
const NODE_MODULES = path.resolve(APP_PATH, 'node_modules')
const VUE_TS_PATH = path.resolve(NODE_MODULES, 'vue-ts-support')
const TEMPLATE_PATH = path.resolve(VUE_TS_PATH, 'template')
const GITIGNORE_PATH = path.resolve(APP_PATH, '.gitignore')
const PACKAGE_JSON = path.resolve(APP_PATH, 'package.json')

function msg(s) {
  console.log(
    chalk.grey('create-vue-project:') +
    ' ' +
    chalk.cyan(s)
  )
}

console.log(
  chalk.green(`Creating Vue.js project in ${process.cwd()}`)
)

msg('Initializing project...')
cp.execSync('yarn init', { stdio: 'inherit' })


msg('Installing dependencies...')
cp.execSync(`yarn add --dev jest file:${THIS_PATH}`, { stdio: 'inherit' })

msg('Configuring the project...')
const packageConfig = require(PACKAGE_JSON)
packageConfig.scripts = {
  'test': 'jest',
  'start': 'vue-run start',
  'build': 'vue-run build'
}
packageConfig.jest = {
  testRegex: '.+\\.(test|spec)\\.(ts|js)$',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  transform: {
    '.+': '<rootDir>/node_modules/jest-webpack'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.+\\.(test|spec)\\.(ts|js)$',
    '.+\\.vue$'
  ],
  notify: true
}
packageConfig.vueTS = {}
fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageConfig, null, 2))

msg('Copying template files...')
cpr(TEMPLATE_PATH, APP_PATH)

// Create gitignore file
msg('Creating .gitignore file...')
fs.writeFileSync(GITIGNORE_PATH, `
# Packaging
/node_modules
/*.lock*
/*.log*

# Test artifacts
/coverage

# Build output
/build
`.trim())

console.log(`
${chalk.green('Vue.js application initialized')}

Start the app:          ${chalk.yellow('npm start')}
Run unit tests:         ${chalk.yellow('npm test')}
Build for production:   ${chalk.yellow('npm run build')}

`)