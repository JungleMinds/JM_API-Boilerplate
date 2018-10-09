const convertLoggerToStream = logger => ({
  write(message) {
    logger.info(message)
  }
})

export default convertLoggerToStream
