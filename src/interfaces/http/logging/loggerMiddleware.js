import morgan from 'morgan'
import LoggerStreamAdapter from 'src/Infrastructure/logging/LoggerStreamAdapter'

module.exports = ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger)
  })
}
