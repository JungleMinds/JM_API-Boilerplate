import Log4js from 'Log4js'

export default ({ config }) => {
  Log4js.configure(config.logging)

  return Log4js.getLogger()
}
