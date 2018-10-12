'use strict'

/* eslint-disable no-console */

require('check-dependencies')({}, result => {
  if (result.error.length) {
    console.log('\n\u001b[31mMissing dependencies!\u001b[39m\n')
    result.error.forEach(err => console.error(err))
    process.exit(1)
  }
})

/* eslint-enable no-console */
