import morgan from 'morgan'
import convertLoggerToStream from '../utils/convertLoggerToStream'

export default ({ logger }) =>
  morgan('dev', {
    stream: convertLoggerToStream(logger)
  })
