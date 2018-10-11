import status from 'http-status'

import devErrorHandler from './devErrorHandler'

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

describe('interfaces/http/errors/devErrorHandler', () => {
  it('should output an internal server error', () => {
    devErrorHandler(mockError, mockReq, mockRes)

    expect(mockLogger.error).toHaveBeenCalledWith(mockError)

    expect(mockRes.status).toHaveBeenCalledWith(status.INTERNAL_SERVER_ERROR)
    expect(mockRes.json).toHaveBeenCalledWith({
      type: 'InternalServerError',
      message: mockError.message,
      stack: mockError.stack
    })
  })
})
