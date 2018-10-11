import path from 'path'

export default controllerURI => {
  const controllerPath = path.resolve(
    __dirname,
    '../controllers',
    controllerURI
  )
  let controller = {}

  try {
    controller = require(controllerPath).default
  } catch (err) {
    throw new Error(`Can't find a controller for '${controllerURI}'`)
  }

  return controller.router
}
