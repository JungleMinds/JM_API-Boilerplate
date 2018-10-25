import Application from './Application'

const mockServer = {
  start: jest.fn(),
  stop: jest.fn()
}
const mockDatabase = {
  authenticate: jest.fn().mockResolvedValue('authenticated')
}

const mockLogger = {
  info: jest.fn(),
  warn: jest.fn()
}

describe('app/Application', () => {
  const app = new Application({
    server: mockServer,
    database: mockDatabase,
    logger: mockLogger
  })

  it('should start the server', async () => {
    await app.start()
    expect(mockDatabase.authenticate).toHaveBeenCalledTimes(1)
    expect(mockServer.start).toHaveBeenCalledTimes(1)
  })

  it('should throw error when database not authenticated', async () => {
    mockDatabase.authenticate.mockClear()
    mockServer.start.mockClear()
    mockLogger.warn.mockClear()
    await app.start()
    mockDatabase.authenticate.mockRejectedValue('error')
    expect(mockDatabase.authenticate).toHaveBeenCalledTimes(1)
    expect(mockLogger.info).not.toHaveBeenCalled()
    expect(mockLogger.warn).toHaveBeenCalledTimes(2)
    expect(mockServer.start).toHaveBeenCalledTimes(1)
  })

  it('should stop the server', () => {
    app.stop()
    expect(mockServer.stop).toHaveBeenCalledTimes(1)
  })
})
