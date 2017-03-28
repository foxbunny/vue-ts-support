const path = require('path')
const fs = require('graceful-fs')
const mkdirp = require('mkdirp')

function pathInfo(path) {
  let stat
  try {
    stat = fs.statSync(path)
  } catch (error) {
    let e = new Error(`Could not stat path ${path}`)
    e.originalError = error
    e.path = path
    throw e
  }
  return {
    get path() {
      return path
    },
    get stat() {
      return stat
    },
    get isDir() {
      return stat.isDirectory()
    },
    get isFile() {
      return stat.isFile()
    }
  }
}

/**
 * Recursively scan a directory tree starting with given path
 */
function* scandir(root) {
  let flist
  try {
    flist = fs.readdirSync(root)
      .map(p => path.join(root, p))
      .map(pathInfo)
  } catch (error) {
    console.error(`Error reading ${root}: ${error}`)
    return
  }
  for (let f of flist) {
    if (f.isDir) {
      for (let f1 of scandir(f.path)) {
        yield f1
      }
    }
    else {
      yield f
    }
  }
}

/**
 * Copy a file from source path to target path
 */
function cp(source, target) {
  fs.writeFileSync(target, fs.readFileSync(source))
}

/**
 * Recursively copy files from one directory to another
 */
function cpr(source, target) {
  for (s of scandir(source)) {
    const reldir = s.path.replace(source, '') 
    const tpath = path.join(target, reldir)
    const tdir = path.dirname(tpath)
    mkdirp.sync(tdir)
    cp(s.path, tpath)
  }
}

module.exports = {
  scandir,
  cp,
  cpr
}