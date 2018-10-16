import { Router } from 'express'
import { inject } from 'awilix-express'
import Status from 'http-status'

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
        res.status(Status.OK).json(users)
      })
      .on(ERROR, next)

    userGetAll.execute()
  }),

  create: inject(({ userCreate }) => (req, res, next) => {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = userCreate.outputs

    userCreate
      .on(SUCCESS, user => {
        res.status(Status.CREATED).json(user)
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        })
      })
      .on(ERROR, next)
    userCreate.execute(req.body)
  }),

  getById: inject(({ userGet }) => (req, res, next) => {}),
  update: inject(({ userUpdate }) => (req, res, next) => {}),
  delete: inject(({ userDelete }) => (req, res, next) => {})
}
