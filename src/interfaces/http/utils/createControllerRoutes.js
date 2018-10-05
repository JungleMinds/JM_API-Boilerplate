import path from 'path'

module.exports = controllerUri => {
  const controllerPath = path.resolve('src/interfaces/http', controllerUri)
  const Controller = require(controllerPath)

  return Controller.router
}
