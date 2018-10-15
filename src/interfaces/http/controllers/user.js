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
  index: inject(({ getAllUsers }) => (req, res, next) => {
    const { SUCCESS, ERROR } = getAllUsers.outputs

    getAllUsers
      .on(SUCCESS, users => {
        res.status(Status.OK).json(users)
      })
      .on(ERROR, next)

    getAllUsers.execute()
  }),

  create: inject(({ createUser }) => (req, res, next) => {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createUser.outputs

    createUser
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
    createUser.execute(req.body)
  }),

  getById: inject(({ getUser }) => (req, res, next) => {}),
  update: inject(({ updateUser }) => (req, res, next) => {}),
  delete: inject(({ deleteUser }) => (req, res, next) => {})
}
