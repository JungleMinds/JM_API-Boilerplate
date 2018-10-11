import express from 'express'

import Server from './Server'

jest.mock('express')

const mockDependencies = {
  config: { test: 'config', web: { port: 80, security: { headers: {} } } },
  router: { test: 'router' },
  logger: { test: 'logger', info: jest.fn() }
}
const mockHttp = {
  close: jest.fn(callback => setTimeout(callback, 1)),
  address: jest.fn(() => mockDependencies.config.web)
}
const mockExpress = {
  disable: jest.fn(),
  use: jest.fn(),
  listen: jest.fn((port, callback) => {
    setTimeout(callback, 1)
    return mockHttp
  })
}

express.mockImplementation(() => mockExpress)

describe('interfaces/http/Server', () => {
  const server = new Server(mockDependencies)

  it('should properly construct', () => {
    expect(server).toHaveProperty('motd')
    expect(server).toHaveProperty('http', null)
    expect(server).toHaveProperty('config', mockDependencies.config)
    expect(server).toHaveProperty('logger', mockDependencies.logger)

    expect(mockExpress.use).toHaveBeenCalledWith(mockDependencies.router)
  })

  it('should start', async () => {
    await server.start().then(() => {
      expect(server).toHaveProperty('http', mockHttp)

      expect(mockDependencies.logger.info).toHaveBeenCalledWith(server.motd)
      expect(mockDependencies.logger.info).toHaveBeenCalledWith(
        `Listening at port ${mockDependencies.config.web.port}`
      )
    })
  })

  it('should stop', async () => {
    await server.stop().then(() => {
      expect(server).toHaveProperty('http', null)

      expect(mockDependencies.logger.info).toHaveBeenCalledWith(
        `Shutting down server...`
      )
    })
  })
})
