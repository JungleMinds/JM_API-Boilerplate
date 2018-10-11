import { Router } from 'express'
import status from 'http-status'

export default {
  get router() {
    const router = Router()

    router.get('/', this.index)
    return router
  },

  index(req, res, next) {
    res.status(status.OK).json({ message: 'welcome to JungleMinds API V 0.1' })
  }
}
