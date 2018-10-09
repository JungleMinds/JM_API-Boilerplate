import morgan from 'morgan'
import convertLoggerToStream from '../utils/convertLoggerToStream'

export default ({ logger }) => {
  return morgan('dev', {
    stream: convertLoggerToStream(logger)
  })
}
