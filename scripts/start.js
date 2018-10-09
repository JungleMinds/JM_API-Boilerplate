process.env.NODE_ENV = process.env.NODE_ENV || 'development'

require('./utils/checkDependencies')

module.exports = require('../index.js')
