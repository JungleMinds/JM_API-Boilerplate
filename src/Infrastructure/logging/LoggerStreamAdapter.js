const LoggerStreamAdapter = {
  toStream(logger) {
    return {
      write(message) {
        logger.info(message)
      }
    }
  }
}

export default LoggerStreamAdapter
