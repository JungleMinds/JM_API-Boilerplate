// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

const chalk = require('chalk')

// Ensure environment variables are read.
require('./utils/env')

// Ensure dependency requirements are met.
require('./utils/checkDependencies')

const jest = require('jest')
let argv = process.argv.slice(2)

// Set path to config
argv.push('-c')
argv.push('jest.config.json')

// Set the max workers to the number of available cores minus 1, with a min. of 1
const cpus = require('os').cpus().length || 1
console.info(
  chalk.green('Running tests on'),
  chalk.bold.white(cpus),
  chalk.green('workers'),
  `\n`
)
argv.push(`--maxWorkers=${cpus}`)

jest.run(argv)
