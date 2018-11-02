import path from 'path'

const COMMIT_HASH = process.env.COMMIT_HASH || 'N.A.'

const config = (ENV = 'development') => {
  let envConfig = {}
  let dbConfig

  try {
    envConfig = require(path.join(__dirname, 'environments', ENV)).default
  } catch (err) {
    throw new Error(`Can't find a config for the environment '${ENV}'`)
  }

  return {
    version: COMMIT_HASH,
    [ENV]: true,
    env: ENV,
    ...envConfig
  }
}

export default config
