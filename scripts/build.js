/* eslint-disable no-console */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

require('./utils/checkDependencies')

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
// require('../config/env')

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
// const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const formatWebpackMessages = require('./utils/formatWebpackMessages')

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const paths = {
  index: path.join(__dirname, '../index.js'),
  distFolder: path.join(__dirname, '../dist'),
  packageJson: path.join(__dirname, '../package.json')
}

const config = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  target: 'node',
  entry: paths.index,
  mode: process.env.NODE_ENV,
  output: {
    path: paths.distFolder,
    filename: 'main.js'
  },
  externals: [nodeExternals()],
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: shouldUseSourceMap ? 'source-map' : false
}

fs.emptyDirSync(paths.distFolder)

build()
  .then(({ stats }) => {
    // console.log('stats', stats)
  })
  .catch(err => {
    console.log(chalk.red('Failed to compile.\n'))
    console.error(err)
  })

// Create the production build and print the deployment instructions.
function build() {
  console.log('Creating an optimized production build...')

  let compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      } else if (messages.warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'))
        console.log(messages.warnings.join('\n\n'))
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        )
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        )
      } else {
        console.log(chalk.green('Compiled successfully.\n'))
      }
      return resolve({
        stats
      })
    })
  })
}

/* eslint-enable no-console */
