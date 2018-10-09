process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Ensure environment variables are read.
require('./utils/env')

// Ensure dependency requirements are met.
require('./utils/checkDependencies')

// expose the app
module.exports = require('../index.js')
