import path from 'path'

export default controllerURI => {
  const controllerPath = path.resolve(
    'src/interfaces/http/controllers',
    controllerURI
  )
  const controller = require(controllerPath).default
  return controller.router
}
