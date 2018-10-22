import express from 'express'
import EventEmitter from 'events'
import status from 'http-status'
import { inject } from 'awilix-express'

import {
  SUCCESS,
  ERROR,
  VALIDATION_ERROR
} from '../../../../app/useCases/user/types'

import user from './index'

const originalRouteHandlers = {
  index: user.index,
  create: user.create,
  getById: user.getById,
  update: user.update,
  delete: user.delete
}

jest.mock('express')
jest.mock('awilix-express')

const mockExpressRouter = {
  get: jest.fn(() => mockExpressRouter),
  post: jest.fn(() => mockExpressRouter),
  put: jest.fn(() => mockExpressRouter),
  delete: jest.fn(() => mockExpressRouter)
}

express.Router.mockImplementation(() => mockExpressRouter)

describe('interfaces/http/controllers/user', () => {
  beforeEach(() => {
    inject.mockClear()
    user.index = originalRouteHandlers.index
    user.create = originalRouteHandlers.create
    user.getById = originalRouteHandlers.getById
    user.update = originalRouteHandlers.update
    user.delete = originalRouteHandlers.delete
  })
  it('should set the routes', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.get).toHaveBeenCalledWith(
      '/',
      user.routeHandlers.index
    )
    expect(mockExpressRouter.post).toHaveBeenCalledWith(
      '/',
      user.routeHandlers.create
    )
    expect(mockExpressRouter.get).toHaveBeenCalledWith(
      '/:id',
      user.routeHandlers.getById
    )
    expect(mockExpressRouter.put).toHaveBeenCalledWith(
      '/:id',
      user.routeHandlers.update
    )
    expect(mockExpressRouter.delete).toHaveBeenCalledWith(
      '/:id',
      user.routeHandlers.delete
    )
  })

  it('should handle the routes', () => {
    inject.mockImplementation(fn => jest.fn(fn))
    user.index = jest.fn()
    user.create = jest.fn()
    user.getById = jest.fn()
    user.update = jest.fn()
    user.delete = jest.fn()

    const handlers = user.createRouteHandlers()
    expect(handlers).toHaveProperty('index')
    handlers.index({ userGetAll: 'test' })(1, 2, 3)
    expect(user.index).toHaveBeenCalledWith('test', 1, 2, 3)

    expect(handlers).toHaveProperty('create')
    handlers.create({ userCreate: 'test' })(1, 2, 3)
    expect(user.create).toHaveBeenCalledWith('test', 1, 2, 3)

    expect(handlers).toHaveProperty('getById')
    handlers.getById({ userGet: 'test' })(1, 2, 3)
    expect(user.getById).toHaveBeenCalledWith('test', 1, 2, 3)

    expect(handlers).toHaveProperty('update')
    handlers.update({ userUpdate: 'test' })(1, 2, 3)
    expect(user.update).toHaveBeenCalledWith('test', 1, 2, 3)

    expect(handlers).toHaveProperty('delete')
    handlers.delete({ userDelete: 'test' })(1, 2, 3)
    expect(user.delete).toHaveBeenCalledWith('test', 1, 2, 3)

    expect(inject).toHaveBeenCalledTimes(5)
  })

  it('should handle the index route with a success', () => {
    const mockUsers = { users: ['test'] }

    const mockGetAllUsers = new EventEmitter()
    mockGetAllUsers.outputs = { SUCCESS, ERROR }
    mockGetAllUsers.execute = jest.fn(() =>
      mockGetAllUsers.emit(SUCCESS, mockUsers)
    )

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    }
    const mockNext = jest.fn()
    user.index(mockGetAllUsers, null, mockRes, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(status.OK)
    expect(mockRes.json).toHaveBeenCalledWith(mockUsers)
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('should handle the index route with an error', () => {
    const mockGetAllUsers = new EventEmitter()
    mockGetAllUsers.outputs = { SUCCESS, ERROR, VALIDATION_ERROR }
    mockGetAllUsers.execute = jest.fn(() => mockGetAllUsers.emit(ERROR))

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    }
    const mockNext = jest.fn()
    user.index(mockGetAllUsers, null, mockRes, mockNext)
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockNext).toHaveBeenCalled()
  })

  it('should handle the create route with a success', () => {
    const mockError = new Error('ValidationError')
    mockError.details = [new Error('detailed error')]

    const mockUserCreate = new EventEmitter()
    mockUserCreate.outputs = { SUCCESS, ERROR, VALIDATION_ERROR }
    mockUserCreate.execute = jest.fn(() =>
      mockUserCreate.emit(VALIDATION_ERROR, mockError)
    )
    const mockReq = {
      body: {}
    }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    }
    const mockNext = jest.fn()
    user.create(mockUserCreate, mockReq, mockRes, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(status.BAD_REQUEST)
    expect(mockRes.json).toHaveBeenCalledWith({
      type: 'ValidationError',
      details: mockError.details
    })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('should handle the create route with a validation error', () => {
    const mockUser = { id: 'test' }

    const mockUserCreate = new EventEmitter()
    mockUserCreate.outputs = { SUCCESS, ERROR, VALIDATION_ERROR }
    mockUserCreate.execute = jest.fn(() =>
      mockUserCreate.emit(SUCCESS, mockUser)
    )
    const mockReq = {
      body: {}
    }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    }
    const mockNext = jest.fn()
    user.create(mockUserCreate, mockReq, mockRes, mockNext)
    expect(mockRes.status).toHaveBeenCalledWith(status.CREATED)
    expect(mockRes.json).toHaveBeenCalledWith(mockUser)
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('should handle the create route with an error', () => {
    const mockUserCreate = new EventEmitter()
    mockUserCreate.outputs = { SUCCESS, ERROR }
    mockUserCreate.execute = jest.fn(() => mockUserCreate.emit(ERROR))

    const mockReq = {
      body: {}
    }
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    }
    const mockNext = jest.fn()
    user.create(mockUserCreate, mockReq, mockRes, mockNext)
    expect(mockRes.status).not.toHaveBeenCalled()
    expect(mockRes.json).not.toHaveBeenCalled()
    expect(mockNext).toHaveBeenCalled()
  })
})
