import Log4js from 'Log4js'

module.exports = ({ config }) => {
  Log4js.configure(config.logging)

  return Log4js.getLogger()
}
