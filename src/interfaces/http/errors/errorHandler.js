import Status from 'http-status'

module.exports = (err, req, res, next) => {
  logger.error(err)

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: 'The server failed to handle this request'
  })
}
