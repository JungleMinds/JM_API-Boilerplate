import status from 'http-status'

export default (err, req, res, next) => {
  const { logger } = req.container.cradle

  logger.error(err)

  res.status(status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: err.message,
    stack: err.stack
  })
}
