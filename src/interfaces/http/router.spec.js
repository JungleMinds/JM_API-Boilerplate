import express from 'express'
import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import methodOverride from 'method-override'
import status from 'http-status'
import controller from './utils/createControllerRoutes'

import router, { apiWelcome } from './router'

jest.mock('express-status-monitor')
jest.mock('cors')
jest.mock('method-override')
jest.mock('body-parser')
jest.mock('compression')
jest.mock('express')
jest.mock('./utils/createControllerRoutes')

const mockDependencies = {
  config: { test: 'config', env: 'production' },
  containerMiddleware: { test: 'containerMiddleware' },
  loggerMiddleware: { test: 'loggerMiddleware' },
  errorHandler: { test: 'errorHandler' }
}
const mockExpressRouter = {
  use: jest.fn(() => mockExpressRouter),
  get: jest.fn(() => mockExpressRouter)
}
const mockRoute = {
  status: jest.fn(() => mockRoute),
  json: jest.fn(() => mockRoute)
}

express.Router.mockImplementation(() => mockExpressRouter)
bodyParser.json = jest.fn()

describe('interfaces/http/Router', () => {
  router(mockDependencies)

  it('should properly construct', () => {
    expect(statusMonitor).not.toHaveBeenCalled()

    expect(mockExpressRouter.use).toHaveBeenCalledWith(
      mockDependencies.loggerMiddleware
    )
  })

  it('should provide the router for the API', () => {
    expect(methodOverride).toHaveBeenCalledWith('X-HTTP-Method-Override')
    expect(cors).toHaveBeenCalled()
    expect(mockExpressRouter.use).toHaveBeenCalledWith(
      mockDependencies.containerMiddleware
    )
    expect(bodyParser.json).toHaveBeenCalled()
    expect(compression).toHaveBeenCalled()

    // routes
    expect(mockExpressRouter.get).toHaveBeenCalledWith('/', apiWelcome)

    expect(mockExpressRouter.use).toHaveBeenCalledWith(
      '/user',
      controller('user')
    )
  })

  it('should handle the API index route with a welcome message', () => {
    apiWelcome(null, mockRoute, null)
    expect(mockRoute.status).toHaveBeenCalledWith(status.OK)
    expect(mockRoute.json).toHaveBeenCalledWith({
      message: 'welcome to JungleMinds API V 0.1'
    })
  })

  it('should provide the main router with the API router as a subroute', () => {
    // routes
    expect(mockExpressRouter.use).toHaveBeenCalledWith(
      '/api',
      mockExpressRouter
    )
    expect(mockExpressRouter.use).toHaveBeenCalledWith(
      mockDependencies.errorHandler
    )
  })

  it('should attach a status monitor in a development environment', () => {
    mockExpressRouter.use.mockClear()
    router({
      ...mockDependencies,
      config: {
        ...mockDependencies.config,
        env: 'development'
      }
    })
    expect(statusMonitor).toHaveBeenCalled()
  })

  it('should NOT attach a logger in a test environment', () => {
    mockExpressRouter.use.mockClear()
    router({
      ...mockDependencies,
      config: {
        ...mockDependencies.config,
        env: 'test'
      }
    })
    expect(mockExpressRouter.use).not.toHaveBeenCalledWith(
      mockDependencies.loggerMiddleware
    )
  })
})
