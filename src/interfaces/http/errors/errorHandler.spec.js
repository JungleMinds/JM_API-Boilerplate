import status from 'http-status'

import errorHandler from './errorHandler'

const mockError = new Error('Oops!')

const mockLogger = {
  error: jest.fn()
}

const mockReq = {
  container: {
    cradle: {
      logger: mockLogger
    }
  }
}

const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn(() => mockRes)
}

describe('interfaces/http/errors/errorHandler', () => {
  it('should output an internal server error', () => {
    errorHandler(mockError, mockReq, mockRes)

    expect(mockLogger.error).toHaveBeenCalledWith(mockError)

    expect(mockRes.status).toHaveBeenCalledWith(status.INTERNAL_SERVER_ERROR)
    expect(mockRes.json).toHaveBeenCalledWith({
      type: 'InternalServerError',
      message: 'The server failed to handle this request'
    })
  })
})
