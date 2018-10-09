import Status from 'http-status'

export default (err, req, res, next) => {
  const { logger } = req.container.cradle

  logger.error(err)

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: 'The server failed to handle this request'
  })
}
