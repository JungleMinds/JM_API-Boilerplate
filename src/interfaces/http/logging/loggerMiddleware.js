import morgan from 'morgan'
import LoggerStreamAdapter from 'src/Infrastructure/logging/LoggerStreamAdapter'

export default ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger)
  })
}
