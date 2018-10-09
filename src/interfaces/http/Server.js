import express from 'express'
class Server {
  constructor({ config, router, logger }) {
    this.config = config
    this.logger = logger
    this.express = express()
    this.http = null

    this.express.disable('x-powered-by')
    this.express.use(router)
  }

  start() {
    return new Promise(resolve => {
      this.http = this.express.listen(this.config.web.port, () => {
        const { port } = this.http.address()
        this.logger.info(`
          __            __        _                __   __
           ||   | |\\ | / _\` |    |__  |\\/| | |\\ | |  \\ /__\`
        \\__/ \\__/ | \\| \\__> |___ |___ |  | | | \\| |__/ .__/

        by: Jungle Minds
        `)
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`)
        resolve()
      })
    })
  }

  stop() {
    return new Promise(resolve => {
      this.http.close(() => {
        this.logger.info(`Shutting down server...`)
        resolve()
      })
    })
  }
}

export default Server
