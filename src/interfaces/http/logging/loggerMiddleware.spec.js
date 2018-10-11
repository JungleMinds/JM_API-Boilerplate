import morgan from 'morgan'
import convertLoggerToStream from '../utils/convertLoggerToStream'

import loggerMiddleware from './loggerMiddleware'

jest.mock('morgan')
jest.mock('../utils/convertLoggerToStream')

const mockDependencies = {
  logger: { test: 'logger' }
}

describe('interfaces/http/logging/loggerMiddleware', () => {
  it('should return a morgan stream', () => {
    loggerMiddleware(mockDependencies)
    expect(morgan).toHaveBeenCalledWith('dev', {
      stream: undefined
    })
    expect(convertLoggerToStream).toHaveBeenCalledWith(mockDependencies.logger)
  })
})
