import path from 'path'

const ENV = process.env.NODE_ENV || 'development'
const COMMIT_HASH = process.env.COMMIT_HASH || 'N.A.'

const envConfig = require(path.join(__dirname, 'environments', ENV)).default

const config = {
  version: COMMIT_HASH,
  [ENV]: true,
  env: ENV,
  ...envConfig
}

export default config
