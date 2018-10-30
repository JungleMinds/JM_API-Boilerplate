import log4js from 'log4js'

import logger from './logger'

jest.mock('log4js')
log4js.configure.mockImplementation(jest.fn())
log4js.getLogger.mockImplementation(jest.fn())

describe('infrastructure/logging/logger', () => {
  it('should initiate the logger with a configuration', () => {
    const mockConfig = { logging: 'test' }
    logger({ config: mockConfig })
    expect(log4js.configure).toHaveBeenCalledWith(mockConfig.logging)
    expect(log4js.getLogger).toHaveBeenCalledTimes(1)
  })
})
