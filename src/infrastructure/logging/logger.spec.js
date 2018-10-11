import Log4js from 'Log4js'

import logger from './logger'

jest.mock('Log4js')
Log4js.configure.mockImplementation(jest.fn())
Log4js.getLogger.mockImplementation(jest.fn())

describe('infrastructure/logging/logger', () => {
  it('should initiate the logger with a configuration', () => {
    const mockConfig = { logging: 'test' }
    logger({ config: mockConfig })
    expect(Log4js.configure).toHaveBeenCalledWith(mockConfig.logging)
    expect(Log4js.getLogger).toHaveBeenCalledTimes(1)
  })
})
