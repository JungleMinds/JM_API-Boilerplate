import fs from 'fs'
import path from 'path'

const COMMIT_HASH = process.env.COMMIT_HASH || 'N.A.'
const DATABASE_URL = process.env.DATABASE_URL

const config = (ENV = 'development') => {
  let envConfig = {}
  let dbConfig

  try {
    envConfig = require(path.join(__dirname, 'environments', ENV)).default
    if (DATABASE_URL) {
      dbConfig = DATABASE_URL
    }

    if (fs.existsSync(path.join(__dirname, './database.js'))) {
      dbConfig = require('./database.js')[ENV]
    }
  } catch (err) {
    throw new Error(`Can't find a config for the environment '${ENV}'`)
  }

  return {
    version: COMMIT_HASH,
    [ENV]: true,
    env: ENV,
    db: dbConfig,
    ...envConfig
  }
}

export default config
