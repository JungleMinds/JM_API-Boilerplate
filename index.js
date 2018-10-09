// Support ES Modules
const _require = require('esm')(module /*, options*/)

// Add babel for older suport
require('@babel/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: []
})

module.exports = _require('./src/index.js')
