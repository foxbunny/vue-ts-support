#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const cp = require('child_process')

const THIS_PATH = path.resolve(__dirname, '..')
const APP_PATH = process.cwd()
const NODE_MODULES = path.resolve(APP_PATH, 'node_modules')
const VUE_TS_PATH = path.resolve(NODE_MODULES, 'vue-ts-support')
const TEMPLATE_PATH = path.resolve(VUE_TS_PATH, 'template')
const GITIGNORE_PATH = path.resolve(APP_PATH, '.gitignore')
const PACKAGE_JSON = path.resolve(APP_PATH, 'package.json')

cp.execSync('yarn init', { stdio: 'inherit' })
cp.execSync(`yarn add --dev jest file:${THIS_PATH}`, { stdio: 'inherit' })

// Patch the application config
const packageConfig = require(PACKAGE_JSON)
packageConfig.scripts = {
  'test': 'jest',
  'start': 'vue-run start',
  'build': 'vue-run build'
}
packageConfig.jest = {
  testRegex: '\\.(test|spec)\\.(ts|js)$',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  transform: {
    '.ts': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    '.vue': '<rootDir>/node_modules/jest-vue-preprocessor',
  }
}
packageConfig.vueTS = {}
fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageConfig, null, 2))

// Copy template files
fs.copySync(TEMPLATE_PATH, APP_PATH)

// Create gitignore file
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
Vue.js application initialized

Start the app:          npm start
Run unit tests:         npm test
Build for production:   npm run build

`)