import express from 'express'
import helmet from 'helmet'

class Server {
  constructor({ config, router, logger }) {
    // Message Of The Day
    this.motd = `
    __            __        _                __   __
     ||   | |\\ | / _\` |    |__  |\\/| | |\\ | |  \\ /__\`
  \\__/ \\__/ | \\| \\__> |___ |___ |  | | | \\| |__/ .__/

  by: Jungle Minds
  `

    this.config = config
    this.logger = logger
    this.express = express()
    this.http = null

    this.express.use(helmet(this.config.web.security.headers))
    this.express.use(router)
  }

  start() {
    return new Promise(resolve => {
      this.http = this.express.listen(this.config.web.port, () => {
        const { port } = this.http.address()
        this.logger.info(this.motd)
        this.logger.info(`Listening at port ${port}`)
        this.logger.info(`on pId [${process.pid}]`)
        resolve()
      })
    })
  }

  stop() {
    return new Promise(resolve => {
      this.http.close(() => {
        this.http = null
        this.logger.info(`Shutting down server...`)
        resolve()
      })
    })
  }
}

export default Server
