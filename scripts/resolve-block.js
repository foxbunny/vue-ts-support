/**
 * Resolve modules webpack block
 *
 * This is a replacement for the limited resolveAlias block, giving you less
 * restrictions but less structure.
 *
 * @see https://webpack.js.org/configuration/resolve/
 */

function resolve(options) {
  return (context) => ({
    resolve: options
  })
}

module.exports = resolve