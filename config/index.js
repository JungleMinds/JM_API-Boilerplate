import dotenv from 'dotenv'
const path = require('path')

dotenv.load()
const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV))

const config = Object.assign(
  {
    [ENV]: true,
    env: ENV
  },
  envConfig
)

export default config
