import { Router } from 'express'
import { inject } from 'awilix-express'
import status from 'http-status'

export default {
  get router() {
    const router = Router()

    router.get('/', this.index)
    router.get('/:id', this.getById)
    router.post('/', this.create)
    router.put('/:id', this.update)
    router.delete('/:id', this.delete)
    return router
  },

  //inject(middlewareFactory): resolves the middleware per request.
  index: inject(({ userGetAll }) => (req, res, next) => {
    const { SUCCESS, ERROR } = userGetAll.outputs

    userGetAll
      .on(SUCCESS, users => {
        res.status(status.OK).json(users)
      })
      // TODO add error handling action
      .on(ERROR, next)

    userGetAll.execute()
  }),

  create: inject(({ userCreate }) => (req, res, next) => {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = userCreate.outputs

    userCreate
      .on(SUCCESS, user => {
        res.status(status.CREATED).json(user)
      })
      .on(VALIDATION_ERROR, error => {
        res.status(status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        })
      })
      // TODO add error handling action
      .on(ERROR, next)
    userCreate.execute(req.body)
  }),

  getById: inject(({ userGet }) => (req, res, next) => {}),
  update: inject(({ userUpdate }) => (req, res, next) => {}),
  delete: inject(({ userDelete }) => (req, res, next) => {})
}
