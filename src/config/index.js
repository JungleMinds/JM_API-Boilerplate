import path from 'path'

const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV)).default

const config = {
  [ENV]: true,
  env: ENV,
  ...envConfig
}

export default config
