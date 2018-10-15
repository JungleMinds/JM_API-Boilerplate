import { Router } from 'express'
import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import methodOverride from 'method-override'
import controller from './utils/createControllerRoutes'

export default ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler
}) => {
  const router = Router()

  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  if (config.env !== 'test') {
    router.use(loggerMiddleware)
  }

  const apiRouter = Router()

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(containerMiddleware)
    .use(bodyParser.json())
    .use(compression())

  apiRouter.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'welcome to JungleMinds API V 0.1' })
  })

  /*
   * Add your API routes here
   */
  apiRouter.use('/users', controller('user'))

  router.use('/api', apiRouter)
  router.use(errorHandler)

  return router
}
