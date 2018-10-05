import { Router } from 'express'
import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import bodyParser from 'body-parser'

module.exports = ({ config, containerMiddleware, loggerMiddleware }) => {
  const router = Router()

  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  if (config.env !== 'test') {
    router.use(loggerMiddleware)
  }

  const apiRouter = Router()

  apiRouter
    .use(cors())
    .use(containerMiddleware)
    .use(bodyParser.json())

  /*
   * Add your API routes here
   */
  router.use('/api', apiRouter)

  return router
}
