import { Router } from 'express'
import { inject } from 'awilix-express'
import status from 'http-status'

export default {
  get router() {
    const router = Router()

    this.routeHandlers = this.createRouteHandlers()

    router.get('/', this.routeHandlers.index)
    router.get('/:id', this.routeHandlers.getById)
    router.post('/', this.routeHandlers.create)
    router.put('/:id', this.routeHandlers.update)
    router.delete('/:id', this.routeHandlers.delete)

    return router
  },

  createRouteHandlers() {
    return {
      index: inject(({ userGetAll }) => (req, res, next) =>
        this.index(userGetAll, req, res, next)
      ),
      create: inject(({ userCreate }) => (req, res, next) =>
        this.create(userCreate, req, res, next)
      ),

      getById: inject(({ userGet }) => (req, res, next) =>
        this.getById(userGet, req, res, next)
      ),
      update: inject(({ userUpdate }) => (req, res, next) =>
        this.update(userUpdate, req, res, next)
      ),
      delete: inject(({ userDelete }) => (req, res, next) =>
        this.delete(userDelete, req, res, next)
      )
    }
  },

  //inject(middlewareFactory): resolves the middleware per request.
  index: (userGetAll, req, res, next) => {
    const { SUCCESS, ERROR } = userGetAll.outputs

    userGetAll
      .on(SUCCESS, users => {
        res.status(status.OK).json(users)
      })
      // TODO add error handling action
      .on(ERROR, next)

    userGetAll.execute()
  },

  create: (userCreate, req, res, next) => {
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
  },

  getById: (userGet, req, res, next) => {
    // do nothing
  },

  update: (userUpdate, req, res, next) => {
    // do nothing
  },

  delete: (userDelete, req, res, next) => {
    // do nothing
  }
}
