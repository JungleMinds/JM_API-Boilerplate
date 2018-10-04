const { createContainer, asClass, asFunction, asValue } = require("awilix");
const { scopePerRequest } = require("awilix-express");

const config = require("../config");

const Application = require("./app/Application");

const Server = require("./interfaces/http/Server");
const router = require("./interfaces/http/router");
const loggerMiddleware = require("./interfaces/http/logging/loggerMiddleware");

const logger = require("./Infrastructure/logging/logger");

const container = createContainer();

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
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container))
  });


module.exports = container;
