const { Router } = require('express')
const Status = require('http-status')

export default {
  get router() {
    const router = Router()

    router.get('/', this.index)
    return router
  },

  index(req, res, next) {
    res.status(Status.OK).json({ msg: 'welcome to JungleMinds API V 0.1' })
  }
}
