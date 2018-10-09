import dotenv from 'dotenv'
import path from 'path'

dotenv.load()
const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV)).default

const config = Object.assign(
  {
    [ENV]: true,
    env: ENV
  },
  envConfig
)

export default config
