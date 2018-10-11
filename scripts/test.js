// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

// Ensure environment variables are read.
require('./utils/env')

// Ensure dependency requirements are met.
require('./utils/checkDependencies')

const jest = require('jest')
let argv = process.argv.slice(2)

// Set path to config
argv.push('-c')
argv.push('jest.config.json')

jest.run(argv)
