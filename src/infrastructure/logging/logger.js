import log4js from 'log4js'

export default ({ config }) => {
  log4js.configure(config.logging)

  return log4js.getLogger()
}
