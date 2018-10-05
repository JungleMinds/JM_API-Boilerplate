import { createContainer, asClass, asFunction, asValue } from 'awilix'
import { scopePerRequest } from 'awilix-express'

import config from '../config'

import Application from './app/Application'

import Server from './interfaces/http/Server'
import router from './interfaces/http/router'
import loggerMiddleware from './interfaces/http/logging/loggerMiddleware'
import errorHandler from './interfaces/http/errors/errorHandler'
import devErrorHandler from './interfaces/http/errors/devErrorHandler'

import logger from './Infrastructure/logging/logger'

const container = createContainer()

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  })

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler)
  })

export default container
