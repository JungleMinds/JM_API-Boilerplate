import convertLoggerToStream from './convertLoggerToStream'

const mockLogger = { info: jest.fn() }

describe('interfaces/http/utils/convertLoggerToStream', () => {
  it('should create a stream from a logger', () => {
    const stream = convertLoggerToStream(mockLogger)
    expect(stream).toHaveProperty('write')
    stream.write('test')
    expect(mockLogger.info).toHaveBeenCalledWith('test')
  })
})
