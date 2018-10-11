import express from 'express'
import status from 'http-status'

import user from './user'

jest.mock('express')

const mockExpressRouter = {
  get: jest.fn(() => mockExpressRouter)
}

express.Router.mockImplementation(() => mockExpressRouter)

describe('interfaces/http/controllers/user', () => {
  it('should set the index route', () => {
    expect(user.router).toEqual(mockExpressRouter)
    expect(mockExpressRouter.get).toHaveBeenCalledWith('/', user.index)
  })

  it('should handle the index route', () => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(() => mockRes)
    }

    user.index({}, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(status.OK)
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'welcome to JungleMinds API V 0.1'
    })
  })
})
