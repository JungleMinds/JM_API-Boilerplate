import Application from './Application'

const mockServer = {
  start: jest.fn(),
  stop: jest.fn()
}

describe('app/Application', () => {
  const app = new Application({ server: mockServer })

  it('should start the server', () => {
    app.start()
    expect(mockServer.start).toHaveBeenCalledTimes(1)
  })

  it('should stop the server', () => {
    app.stop()
    expect(mockServer.stop).toHaveBeenCalledTimes(1)
  })
})
