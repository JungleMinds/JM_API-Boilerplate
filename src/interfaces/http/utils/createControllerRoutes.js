import path from 'path'

export default  controllerUri => {
  const controllerPath = path.resolve('src/interfaces/http', controllerUri)
  const Controller = require(controllerPath)

  return Controller.router
}
