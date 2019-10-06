/* eslint-env node */

const path = require('path')

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
