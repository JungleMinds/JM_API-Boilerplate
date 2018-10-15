import { createContainer, asClass, asFunction, asValue } from 'awilix'
import { scopePerRequest } from 'awilix-express'

import config from './config'

import Application from './app/Application'
import { GetAllUsers } from './app/useCases/user'

import { UserRepository } from './infrastructure/repositories/user/index'

import Server from './interfaces/http/Server'
import router from './interfaces/http/router'
import loggerMiddleware from './interfaces/http/logging/loggerMiddleware'
import errorHandler from './interfaces/http/errors/errorHandler'
import devErrorHandler from './interfaces/http/errors/devErrorHandler'

import logger from './infrastructure/logging/logger'

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

// Add the middleware, passing it your Awilix container. This will attach a scoped container on the context.
container.register({
  containerMiddleware: asValue(scopePerRequest(container))
})

container.register({
  loggerMiddleware: asFunction(loggerMiddleware).singleton()
})
container.register({
  errorHandler: asValue(config.production ? errorHandler : devErrorHandler)
})

// Repositories
container.register({
  usersRepository: asClass(UserRepository).singleton()
})

// EventStore use cases
container.register({
  getAllUsers: asClass(GetAllUsers)
})

export default container
