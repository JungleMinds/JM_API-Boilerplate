import express from 'express'

import user from './index'

jest.mock('express')

const mockExpressRouter = {
  get: jest.fn(() => mockExpressRouter),
  post: jest.fn(() => mockExpressRouter),
  put: jest.fn(() => mockExpressRouter),
  delete: jest.fn(() => mockExpressRouter)
}

express.Router.mockImplementation(() => mockExpressRouter)

describe('interfaces/http/controllers/user', () => {
  it('should set the index route', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.get).toHaveBeenCalledWith('/', user.index)
  })

  it('should set the create route', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.post).toHaveBeenCalledWith('/', user.create)
  })

  it('should set the get one by Id route', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.get).toHaveBeenCalledWith('/:id', user.getById)
  })

  it('should set the update route', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.put).toHaveBeenCalledWith('/:id', user.update)
  })

  it('should set the create route', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.delete).toHaveBeenCalledWith('/:id', user.delete)
  })
})
