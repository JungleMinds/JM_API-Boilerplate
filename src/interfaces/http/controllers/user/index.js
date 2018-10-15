import { Router } from 'express'
import { inject } from 'awilix-express'
import Status from 'http-status'

export default {
  get router() {
    const router = Router()

    router.get('/', this.index)
    return router
  },

  //inject(middlewareFactory): resolves the middleware per request.
  index: inject(({ getAllUsers }) => (req, res, next) => {
    const { SUCCESS, ERROR } = getAllUsers.outputs

    getAllUsers
      .on(SUCCESS, users => {
        res.status(Status.OK).json(users)
      })
      .on(ERROR, next)

    getAllUsers.execute()
  })
}
